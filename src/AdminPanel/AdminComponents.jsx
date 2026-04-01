// // Status Badge
// export function StatusBadge({ status }) {
//   const map = {
//     active: "bg-green-50 text-green-700 border border-green-200",
//     suspended: "bg-red-50 text-red-700 border border-red-200",
//     pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
//     banned: "bg-gray-100 text-gray-600 border border-gray-300",
//     verified: "bg-green-50 text-green-700 border border-green-200",
//     unverified: "bg-orange-50 text-orange-700 border border-orange-200",
//     rejected: "bg-red-50 text-red-700 border border-red-200",
//     low: "bg-green-50 text-green-700 border border-green-200",
//     medium: "bg-yellow-50 text-yellow-700 border border-yellow-200",
//     high: "bg-red-50 text-red-700 border border-red-200",
//     "in progress": "bg-blue-50 text-blue-700 border border-blue-200",
//     completed: "bg-green-50 text-green-700 border border-green-200",
//   };
//   const cls = map[status?.toLowerCase()] || "bg-gray-50 text-gray-600 border border-gray-200";
//   return (
//     <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize ${cls}`}>
//       {status}
//     </span>
//   );
// }

// // Trust Score Bar
// export function TrustScore({ score }) {
//   const color =
//     score >= 75 ? "bg-green-500" : score >= 50 ? "bg-yellow-400" : "bg-red-400";
//   const textColor =
//     score >= 75 ? "text-green-600" : score >= 50 ? "text-yellow-600" : "text-red-500";
//   return (
//     <div className="flex items-center gap-2 min-w-[80px]">
//       <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
//         <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
//       </div>
//       <span className={`text-xs font-semibold ${textColor}`}>{score}</span>
//     </div>
//   );
// }

// // Risk Flag
// export function RiskFlag({ level }) {
//   if (!level || level === "none") return <span className="text-gray-300 text-xs">—</span>;
//   const map = {
//     low: "🟢",
//     medium: "🟡",
//     high: "🔴",
//   };
//   return (
//     <span className="flex items-center gap-1 text-xs">
//       {map[level?.toLowerCase()] || "⚪"}{" "}
//       <span className="text-gray-500 capitalize">{level}</span>
//     </span>
//   );
// }

// // Stat Card
// export function StatCard({ label, value, sub, color = "green",bg = "white",border="white"}) {
//   const colorMap = {
//     green: "text-green-600",
//     blue: "text-blue-600",
//     orange: "text-orange-500",
//     red: "text-red-500",
//     gray: "text-gray-600",
//   };

//   const BgcolorMap = {
//     green: "bg-green-100",
//     blue: "bg-blue-100",
//     orange: "bg-orange-100",
//     red: "bg-red-100",
//     gray: "bg-gray-100",
//     yellow:"bg-yellow-100"
//   };

//     const BordercolorMap = {
//     green: "border-green-400",
//     blue: "border-blue-400",
//     orange: "border-orange-400",
//     red: "border-red-400",
//     gray: "border-gray-400",
//   };
  
  
//   return (
//     <div className={`rounded-xl border border-wgray-100 p-4 shado-sm ${BgcolorMap[bg]} ${BordercolorMap[border]}`}>
//       <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{label}</p>
//       <p className={`text-2xl font-bold ${colorMap[color]}`}>{value}</p>
//       {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
//     </div>
//   );
// }

// // Avatar
// export function Avatar({ name, size = "sm" }) {
//   const initials = name
//     ?.split(" ")
//     .slice(0, 2)
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase();
//   const colors = [
//     "bg-green-500","bg-blue-500","bg-purple-500","bg-orange-500","bg-pink-500","bg-teal-500",
//   ];
//   const color = colors[(name?.charCodeAt(0) || 0) % colors.length];
//   const sizeMap = { sm: "w-7 h-7 text-[11px]", md: "w-9 h-9 text-sm", lg: "w-12 h-12 text-base" };
//   return (
//     <div className={`${sizeMap[size]} ${color} rounded-full flex items-center justify-center text-white font-bold shrink-0`}>
//       {initials}
//     </div>
//   );
// }

// // Empty State
// export function EmptyState({ message = "No data found" }) {
//   return (
//     <div className="flex flex-col items-center justify-center py-16 text-center">
//       <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
//         <span className="text-gray-400 text-xl">◎</span>
//       </div>
//       <p className="text-gray-500 text-sm">{message}</p>
//     </div>
//   );
// }

// // Search + Filter Bar
// export function SearchBar({ value, onChange, placeholder = "Search...", children }) {
//   return (
//     <div className="flex items-center gap-3 flex-wrap">
//       <div className="relative flex-1 min-w-[200px] max-w-xs">
//         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
//         <input
//           type="text"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           placeholder={placeholder}
//           className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 text-[10px]"
//         />
//       </div>
//       {children}
//     </div>
//   );
// }

// // Filter Select
// export function FilterSelect({ value, onChange, options, label }) {
//   return (
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className=" bg-white border border-gray-400 rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600 text-[12px]"
//     >
//       <option value="">{label}</option>
//       {options.map((o) => (
//         <option key={o.value} value={o.value}>{o.label}</option>
//       ))}
//     </select>
//   );
// }

// // Action Button
// export function ActionBtn({ label, onClick, variant = "default", size = "sm" ,style}) {
//   const variants = {
//     default: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
//     primary: "bg-green-500 text-white hover:bg-green-600 border border-green-500",
//     danger: "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100",
//     warning: "bg-yellow-50 border border-yellow-200 text-yellow-700 hover:bg-yellow-100",
//     custom:"bg-[#1A2B5E]",
//   };
//   const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm" };
//   return (
//     <button
//       onClick={onClick}
//       className={`rounded-lg font-medium transition-colors ${variants[variant]} ${sizes[size]}`}
//       style={style}
//     >
//       {label}
//     </button>
//   );
// }

// // Page Header
// export function PageHeader({ title, subtitle, actions }) {
//   return (
//     <div className="flex items-start justify-between mb-6">
//       <div>
//         <h1 className="text-xl font-bold text-gray-900">{title}</h1>
//         {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
//       </div>
//       {actions && <div className="flex items-center gap-2">{actions}</div>}
//     </div>
//   );
// }

// // Info Row (for detail pages)
// export function InfoRow({ label, value }) {
//   return (
//     <div className="flex items-start gap-4 py-2.5 border-b border-gray-50 last:border-0">
//       <span className="text-xs text-gray-400 font-medium w-32 shrink-0 pt-0.5">{label}</span>
//       <span className="text-sm text-gray-800 font-medium">{value || "—"}</span>
//     </div>
//   );
// }

// // Section Card
// export function SectionCard({ title, children, className = "" }) {
//   return (
//     <div className={`bg-white rounded-xl border border-gray-100 shadow-sm ${className}`}>
//       {title && (
//         <div className="px-5 py-3.5 border-b border-gray-100">
//           <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
//         </div>
//       )}
//       <div className="p-5">{children}</div>
//     </div>
//   );
// }

// // Table
// export function Table({ headers, children, empty }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-sm">
//         <thead>
//           <tr className="border-b border-gray-100">
//             {headers.map((h) => (
//               <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 pr-4 last:pr-0">
//                 {h}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>{children}</tbody>
//       </table>
//       {empty}
//     </div>
//   );
// }










// Status Badge
export function StatusBadge({ status }) {
  const map = {
    active: "bg-green-50 text-green-700 border border-green-200",
    suspended: "bg-red-50 text-red-700 border border-red-200",
    pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    banned: "bg-gray-100 text-gray-600 border border-gray-300",
    verified: "bg-green-50 text-green-700 border border-green-200",
    unverified: "bg-orange-50 text-orange-700 border border-orange-200",
    rejected: "bg-red-50 text-red-700 border border-red-200",
    low: "bg-green-50 text-green-700 border border-green-200",
    medium: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    high: "bg-red-50 text-red-700 border border-red-200",
    "in progress": "bg-blue-50 text-blue-700 border border-blue-200",
    completed: "bg-green-50 text-green-700 border border-green-200",
  };
  const cls = map[status?.toLowerCase()] || "bg-gray-50 text-gray-600 border border-gray-200";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold capitalize ${cls} whitespace-nowrap`}>
      {status}
    </span>
  );
}

// Trust Score Bar
export function TrustScore({ score }) {
  const color =
    score >= 75 ? "bg-green-500" : score >= 50 ? "bg-yellow-400" : "bg-red-400";
  const textColor =
    score >= 75 ? "text-green-600" : score >= 50 ? "text-yellow-600" : "text-red-500";
  return (
    <div className="flex items-center gap-1.5 min-w-[70px] sm:min-w-[80px]">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-[10px] sm:text-xs font-semibold ${textColor}`}>{score}</span>
    </div>
  );
}

// Risk Flag
export function RiskFlag({ level }) {
  if (!level || level === "none") return <span className="text-gray-300 text-xs">—</span>;
  const map = {
    low: "🟢",
    medium: "🟡",
    high: "🔴",
  };
  return (
    <span className="flex items-center gap-1 text-[10px] sm:text-xs">
      {map[level?.toLowerCase()] || "⚪"}{" "}
      <span className="text-gray-500 capitalize">{level}</span>
    </span>
  );
}

// Stat Card
export function StatCard({ label, value, sub, color = "green", bg = "white", border = "white" }) {
  const colorMap = {
    green: "text-green-600",
    blue: "text-blue-600",
    orange: "text-orange-500",
    red: "text-red-500",
    gray: "text-gray-600",
  };
  const BgcolorMap = {
    green: "bg-green-100",
    blue: "bg-blue-100",
    orange: "bg-orange-100",
    red: "bg-red-100",
    gray: "bg-gray-100",
    yellow: "bg-yellow-100",
  };
  const BordercolorMap = {
    green: "border-green-400",
    blue: "border-blue-400",
    orange: "border-orange-400",
    red: "border-red-400",
    gray: "border-gray-400",
  };

  return (
    <div className={`rounded-xl border p-3 sm:p-4 shadow-sm flex-1 min-w-0 ${BgcolorMap[bg] || BgcolorMap.gray} ${BordercolorMap[border] || BordercolorMap.gray}`}>
      <p className="text-[9px] sm:text-xs text-gray-400 font-medium uppercase tracking-wide mb-1 truncate">{label}</p>
      <p className={`text-xl sm:text-2xl font-bold ${colorMap[color]}`}>{value}</p>
      {sub && <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 truncate">{sub}</p>}
    </div>
  );
}

// Avatar
export function Avatar({ name, size = "sm" }) {
  const initials = name
    ?.split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const colors = [
    "bg-green-500", "bg-blue-500", "bg-purple-500", "bg-orange-500", "bg-pink-500", "bg-teal-500",
  ];
  const color = colors[(name?.charCodeAt(0) || 0) % colors.length];
  const sizeMap = {
    sm: "w-6 h-6 sm:w-7 sm:h-7 text-[9px] sm:text-[11px]",
    md: "w-8 h-8 sm:w-9 sm:h-9 text-xs sm:text-sm",
    lg: "w-10 h-10 sm:w-12 sm:h-12 text-sm sm:text-base",
  };
  return (
    <div className={`${sizeMap[size]} ${color} rounded-full flex items-center justify-center text-white font-bold shrink-0`}>
      {initials}
    </div>
  );
}

// Empty State
export function EmptyState({ message = "No data found" }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
        <span className="text-gray-400 text-lg sm:text-xl">◎</span>
      </div>
      <p className="text-gray-500 text-xs sm:text-sm">{message}</p>
    </div>
  );
}

// Search + Filter Bar
export function SearchBar({ value, onChange, placeholder = "Search...", children }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 flex-wrap w-full">
      <div className="relative flex-1 min-w-[140px] sm:min-w-[200px] max-w-xs">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs sm:text-sm">🔍</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-8 sm:pl-9 pr-3 py-1.5 sm:py-2 text-[11px] sm:text-sm bg-white border border-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}

// Filter Select
export function FilterSelect({ value, onChange, options, label }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white border border-gray-400 rounded-2xl px-2 sm:px-3 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600 text-[10px] sm:text-[12px] max-w-[120px] sm:max-w-none"
    >
      <option value="">{label}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

// Action Button
export function ActionBtn({ label, onClick, variant = "default", size = "sm", style }) {
  const variants = {
    default: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
    primary: "bg-green-500 text-white hover:bg-green-600 border border-green-500",
    danger: "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100",
    warning: "bg-yellow-50 border border-yellow-200 text-yellow-700 hover:bg-yellow-100",
    custom: "bg-[#1A2B5E]",
  };
  const sizes = {
    sm: "px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs",
    md: "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm",
  };
  return (
    <button
      onClick={onClick}
      className={`rounded-lg font-medium transition-colors whitespace-nowrap ${variants[variant]} ${sizes[size]}`}
      style={style}
    >
      {label}
    </button>
  );
}

// Page Header
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4 sm:mb-6">
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  );
}

// Info Row (for detail pages)
export function InfoRow({ label, value }) {
  return (
    <div className="flex items-start gap-2 sm:gap-4 py-2 sm:py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-[10px] sm:text-xs text-gray-400 font-medium w-24 sm:w-32 shrink-0 pt-0.5">{label}</span>
      <span className="text-xs sm:text-sm text-gray-800 font-medium break-words">{value || "—"}</span>
    </div>
  );
}

// Section Card
export function SectionCard({ title, children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm ${className}`}>
      {title && (
        <div className="px-4 sm:px-5 py-3 sm:py-3.5 border-b border-gray-100">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

// Table
export function Table({ headers, children, empty }) {
  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <table className="w-full text-sm min-w-[500px]">
        <thead>
          <tr className="border-b border-gray-100">
            {headers.map((h) => (
              <th key={h} className="text-left text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 pr-3 sm:pr-4 last:pr-0">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      {empty}
    </div>
  );
}