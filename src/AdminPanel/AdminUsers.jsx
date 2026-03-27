import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "./mockData";
import { StatusBadge, TrustScore, RiskFlag, Avatar } from "./AdminComponents";
import {
  Users, Briefcase, Building2, UserCheck, AlertTriangle,
  Search, Filter, Download, Eye, MoreHorizontal,
  ChevronLeft, ChevronRight, CheckSquare, Square,
  Shield, TrendingUp, UserX, Bot, X
} from "lucide-react";

// ── Theme tokens ────────────────────────────────────────────────────────────
const T = {
  navy:      "#0d1b3e",
  navyMid:   "#0a2444",
  teal:      "#1ab5c8",
  green:     "#3ddc84",
  greenTeal: "linear-gradient(135deg, #3ddc84 0%, #1ab5c8 100%)",
  navyTeal:  "linear-gradient(135deg, #0d1b3e 0%, #1ab5c8 100%)",
  bg:        "#f0f4ff",
  white:     "#ffffff",
  border:    "#eaeef6",
  muted:     "#8a9ab5",
  textDark:  "#0d1b3e",
  textMid:   "#4a5e7a",
  textLight: "#8a9ab5",
};

// ── Helpers ─────────────────────────────────────────────────────────────────
const PAGE_SIZE = 10;

function exportCSV(users) {
  const headers = ["ID","Name","Email","Role","Status","Trust Score","KYC","Risk","Last Active","Joined"];
  const rows = users.map(u => [
    u.id, u.name, u.email, u.role, u.status,
    u.trustScore, u.verification, u.riskLevel, u.lastActive, u.joinDate
  ]);
  const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = "users_export.csv"; a.click();
  URL.revokeObjectURL(url);
}

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon: Icon, accent }) {
  return (
    <div style={{
      background: T.white,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: "18px 20px",
      display: "flex",
      alignItems: "center",
      gap: 14,
      boxShadow: "0 2px 8px rgba(10,36,68,0.05)",
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: accent,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <Icon size={20} color="#fff" />
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: T.navy, letterSpacing: -0.5 }}>{value}</p>
        <p style={{ margin: 0, fontSize: 12, color: T.muted, fontWeight: 500 }}>{label}</p>
        {sub && <p style={{ margin: 0, fontSize: 11, color: T.teal, fontWeight: 600 }}>{sub}</p>}
      </div>
    </div>
  );
}

// ── Checkbox ─────────────────────────────────────────────────────────────────
function Checkbox({ checked, indeterminate, onChange }) {
  return (
    <div
      onClick={onChange}
      style={{
        width: 17, height: 17, borderRadius: 5, cursor: "pointer", flexShrink: 0,
        background: checked || indeterminate ? T.greenTeal : T.white,
        border: checked || indeterminate ? "none" : `2px solid ${T.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.15s",
        boxShadow: checked ? "0 2px 6px rgba(61,220,132,0.35)" : "none",
      }}
    >
      {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      {indeterminate && !checked && <div style={{ width: 8, height: 2, background: "#fff", borderRadius: 2 }} />}
    </div>
  );
}

// ── Role badge ────────────────────────────────────────────────────────────────
const roleMeta = {
  Freelancer: { color: "#6366f1", bg: "#eef2ff" },
  Agency:     { color: "#0891b2", bg: "#ecfeff" },
  Client:     { color: "#059669", bg: "#ecfdf5" },
};

function RoleBadge({ role }) {
  const m = roleMeta[role] || { color: T.muted, bg: "#f4f7ff" };
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, color: m.color, background: m.bg,
      padding: "3px 9px", borderRadius: 20, whiteSpace: "nowrap",
    }}>{role}</span>
  );
}

// ── Action button ─────────────────────────────────────────────────────────────
function Btn({ label, icon: Icon, onClick, variant = "default", small }) {
  const styles = {
    primary: { bg: T.greenTeal, color: "#fff", border: "none" },
    danger:  { bg: "linear-gradient(135deg,#ff4e4e,#e02020)", color: "#fff", border: "none" },
    warning: { bg: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#fff", border: "none" },
    default: { bg: T.white, color: T.textMid, border: `1px solid ${T.border}` },
    navy:    { bg: T.navyTeal, color: "#fff", border: "none" },
  };
  const s = styles[variant];
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 5,
        padding: small ? "5px 10px" : "7px 13px",
        borderRadius: 8, cursor: "pointer", fontSize: small ? 11 : 12,
        fontWeight: 600, whiteSpace: "nowrap",
        background: s.bg, color: s.color, border: s.border,
        boxShadow: variant !== "default" ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
        transition: "opacity 0.15s",
      }}
      onMouseOver={e => e.currentTarget.style.opacity = "0.85"}
      onMouseOut={e => e.currentTarget.style.opacity = "1"}
    >
      {Icon && <Icon size={13} />}
      {label}
    </button>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function AdminUsers() {
  const navigate = useNavigate();
  const [search, setSearch]         = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [selected, setSelected]     = useState([]);
  const [page, setPage]             = useState(1);

  // Filter
  const filtered = useMemo(() => mockUsers.filter(u => {
    const q = search.toLowerCase();
    return (
      (u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q)) &&
      (!roleFilter   || u.role      === roleFilter)   &&
      (!statusFilter || u.status    === statusFilter) &&
      (!riskFilter   || u.riskLevel === riskFilter)
    );
  }), [search, roleFilter, statusFilter, riskFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage   = Math.min(page, totalPages);
  const paged      = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  // Selection
  const allSelected  = paged.length > 0 && paged.every(u => selected.includes(u.id));
  const someSelected = paged.some(u => selected.includes(u.id)) && !allSelected;

  const toggleOne = (id) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleAll = () => setSelected(allSelected ? selected.filter(id => !paged.find(u => u.id === id)) : [...new Set([...selected, ...paged.map(u => u.id)])]);

  // Stats
  const stats = {
    total:     mockUsers.length,
    active:    mockUsers.filter(u => u.status === "Active").length,
    flagged:   mockUsers.filter(u => u.aiFlag).length,
    suspended: mockUsers.filter(u => u.status === "Suspended" || u.status === "Banned").length,
  };

  const selectedUsers = mockUsers.filter(u => selected.includes(u.id));

  const th = { fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: 0.8, padding: "10px 14px", borderBottom: `1px solid ${T.border}`, background: "#f8faff", whiteSpace: "nowrap" };
  const td = { padding: "12px 14px", borderBottom: `1px solid ${T.border}`, verticalAlign: "middle" };

  return (
    <div style={{ padding: 24, background: T.bg, minHeight: "100%", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: T.navy, letterSpacing: -0.5 }}>All Users</h1>
          <p style={{ margin: "3px 0 0", fontSize: 13, color: T.muted }}>Every account on the Weblance platform</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {selected.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "6px 12px" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{selected.length} selected</span>
              <Btn label="Warn"    variant="warning" small />
              <Btn label="Suspend" variant="danger"  small />
              <Btn label="Export Selected" icon={Download} variant="default" small onClick={() => exportCSV(selectedUsers)} />
              <button onClick={() => setSelected([])} style={{ background: "none", border: "none", cursor: "pointer", color: T.muted, display: "flex", alignItems: "center" }}><X size={14} /></button>
            </div>
          )}
          <Btn label="Export All" icon={Download} variant="navy" onClick={() => exportCSV(filtered)} />
        </div>
      </div>

      {/* ── Stats ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 }}>
        <StatCard label="Total Users"       value={stats.total}     icon={Users}         accent={T.navyTeal} />
        <StatCard label="Active"            value={stats.active}    icon={TrendingUp}     accent="linear-gradient(135deg,#3ddc84,#059669)" sub={`${Math.round(stats.active/stats.total*100)}% of total`} />
        <StatCard label="AI Flagged"        value={stats.flagged}   icon={Bot}            accent="linear-gradient(135deg,#f59e0b,#d97706)" sub="Needs review" />
        <StatCard label="Suspended / Banned" value={stats.suspended} icon={UserX}         accent="linear-gradient(135deg,#ff4e4e,#e02020)" />
      </div>

      {/* ── Table Card ── */}
      <div style={{ background: T.white, borderRadius: 16, border: `1px solid ${T.border}`, boxShadow: "0 2px 12px rgba(10,36,68,0.06)", overflow: "hidden" }}>

        {/* Filter bar */}
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: T.muted }} />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search name, email, ID…"
              style={{ width: "100%", paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, color: T.textDark, background: "#f8faff", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {/* Filters */}
          {[
            { val: roleFilter,   set: setRoleFilter,   label: "All Roles",   opts: ["Freelancer","Agency","Client"] },
            { val: statusFilter, set: setStatusFilter, label: "All Status",  opts: ["Active","Pending","Suspended","Banned"] },
            { val: riskFilter,   set: setRiskFilter,   label: "All Risk",    opts: ["Low","Medium","High"] },
          ].map(f => (
            <select
              key={f.label}
              value={f.val}
              onChange={e => { f.set(e.target.value); setPage(1); }}
              style={{ padding: "8px 12px", border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12, color: f.val ? T.navy : T.muted, background: f.val ? "#f0f4ff" : "#f8faff", outline: "none", cursor: "pointer", fontWeight: f.val ? 600 : 400 }}
            >
              <option value="">{f.label}</option>
              {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          ))}

          <span style={{ fontSize: 12, color: T.muted, fontWeight: 600, marginLeft: "auto" }}>{filtered.length} results</span>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ ...th, width: 44, textAlign: "center" }}>
                  <Checkbox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
                </th>
                {["User","Role","Status","Trust Score","KYC","Risk","Last Active","Joined","Actions"].map(h => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr><td colSpan={10} style={{ ...td, textAlign: "center", padding: "48px 0", color: T.muted, fontSize: 13 }}>
                  No users match your filters
                </td></tr>
              ) : paged.map(user => {
                const isSel = selected.includes(user.id);
                return (
                  <tr
                    key={user.id}
                    onClick={() => navigate(`/admin/users/${user.id}`)}
                    style={{
                      cursor: "pointer",
                      background: isSel ? "linear-gradient(90deg,rgba(61,220,132,0.06),rgba(26,181,200,0.04))" : "transparent",
                      transition: "background 0.12s",
                    }}
                    onMouseOver={e => { if (!isSel) e.currentTarget.style.background = "#f8faff"; }}
                    onMouseOut={e => { if (!isSel) e.currentTarget.style.background = "transparent"; }}
                  >
                    {/* Checkbox */}
                    <td style={{ ...td, textAlign: "center" }} onClick={e => { e.stopPropagation(); toggleOne(user.id); }}>
                      <Checkbox checked={isSel} onChange={() => toggleOne(user.id)} />
                    </td>

                    {/* User */}
                    <td style={td}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                          background: T.navyTeal,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 12, fontWeight: 800, color: "#fff",
                        }}>
                          {user.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{user.name}</span>
                            {user.aiFlag && (
                              <span style={{ fontSize: 10, fontWeight: 700, color: "#ef4444", background: "#fef2f2", border: "1px solid #fecaca", padding: "1px 6px", borderRadius: 20 }}>AI⚑</span>
                            )}
                          </div>
                          <span style={{ fontSize: 11, color: T.muted }}>{user.email}</span>
                          <span style={{ fontSize: 10, color: "#c0cce0", display: "block" }}>{user.id}</span>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td style={td}><RoleBadge role={user.role} /></td>

                    {/* Status */}
                    <td style={td}><StatusBadge status={user.status} /></td>

                    {/* Trust */}
                    <td style={td}><TrustScore score={user.trustScore} /></td>

                    {/* KYC */}
                    <td style={td}><StatusBadge status={user.verification} /></td>

                    {/* Risk */}
                    <td style={td}><RiskFlag level={user.riskLevel} /></td>

                    {/* Last Active */}
                    <td style={{ ...td, fontSize: 12, color: T.muted, whiteSpace: "nowrap" }}>{user.lastActive}</td>

                    {/* Joined */}
                    <td style={{ ...td, fontSize: 12, color: T.muted, whiteSpace: "nowrap" }}>{user.joinDate}</td>

                    {/* Actions — always visible */}
                    <td style={{ ...td, whiteSpace: "nowrap" }} onClick={e => e.stopPropagation()}>
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <button
                          onClick={() => navigate(`/admin/users/${user.id}`)}
                          style={{
                            display: "flex", alignItems: "center", gap: 4,
                            padding: "5px 10px", borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: "pointer",
                            background: T.greenTeal, color: "#fff", border: "none",
                            boxShadow: "0 2px 6px rgba(61,220,132,0.3)",
                          }}
                        >
                          <Eye size={12} /> View
                        </button>
                        <button
                          style={{
                            display: "flex", alignItems: "center",
                            padding: "5px 8px", borderRadius: 7, cursor: "pointer",
                            background: T.white, color: T.muted, border: `1px solid ${T.border}`,
                          }}
                        >
                          <MoreHorizontal size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div style={{ padding: "12px 18px", borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: T.muted }}>
            Showing <b style={{ color: T.navy }}>{(safePage-1)*PAGE_SIZE+1}–{Math.min(safePage*PAGE_SIZE, filtered.length)}</b> of <b style={{ color: T.navy }}>{filtered.length}</b> users
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button
              onClick={() => setPage(p => Math.max(1, p-1))}
              disabled={safePage === 1}
              style={{
                padding: "6px 10px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: safePage===1?"not-allowed":"pointer",
                background: T.white, color: safePage===1?T.muted:T.navy, border: `1px solid ${T.border}`,
                opacity: safePage===1?0.5:1,
              }}
            >
              <ChevronLeft size={14} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i+1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx-1] > 1) acc.push("…");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) => p === "…" ? (
                <span key={`e${i}`} style={{ padding: "0 4px", color: T.muted, fontSize: 12 }}>…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{
                    width: 32, height: 32, borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer",
                    background: p === safePage ? T.greenTeal : T.white,
                    color: p === safePage ? "#fff" : T.navy,
                    border: p === safePage ? "none" : `1px solid ${T.border}`,
                    boxShadow: p === safePage ? "0 2px 8px rgba(61,220,132,0.3)" : "none",
                  }}
                >{p}</button>
              ))
            }

            <button
              onClick={() => setPage(p => Math.min(totalPages, p+1))}
              disabled={safePage === totalPages}
              style={{
                padding: "6px 10px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: safePage===totalPages?"not-allowed":"pointer",
                background: T.white, color: safePage===totalPages?T.muted:T.navy, border: `1px solid ${T.border}`,
                opacity: safePage===totalPages?0.5:1,
              }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}