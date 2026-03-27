import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { mockFreelancers } from "./mockData";
import { TrustScore, RiskFlag } from "./AdminComponents";
import {
  Search, Download, Eye, MoreHorizontal,
  ChevronLeft, ChevronRight, X,
  Briefcase, TrendingUp, AlertTriangle, EyeOff,
  Star, Award, CheckCircle,
} from "lucide-react";

// ── Theme ────────────────────────────────────────────────────────────────────
const T = {
  navy:     "#0d1b3e",
  teal:     "#1ab5c8",
  green:    "#3ddc84",
  greenTeal:"linear-gradient(135deg, #3ddc84 0%, #1ab5c8 100%)",
  navyTeal: "linear-gradient(135deg, #0d1b3e 0%, #1ab5c8 100%)",
  bg:       "#f0f4ff",
  white:    "#ffffff",
  border:   "#eaeef6",
  muted:    "#8a9ab5",
  textDark: "#0d1b3e",
  textMid:  "#4a5e7a",
};

const PAGE_SIZE = 10;

function exportCSV(rows) {
  const headers = ["ID","Name","Email","Primary Skill","Badge","Skill Score","Trust Score","Active Projects","Completed","Dispute Rate","On-Time","Visibility","Risk"];
  const data = rows.map(f => [
    f.id, f.name, f.email, f.primarySkill, f.badge,
    f.skillScore, f.trustScore, f.activeProjects, f.completedProjects,
    f.disputeRate, f.onTimeDelivery, f.visibility, f.riskFlag
  ]);
  const csv = [headers, ...data].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = "freelancers_export.csv"; a.click();
  URL.revokeObjectURL(a.href);
}

// ── Checkbox ──────────────────────────────────────────────────────────────────
function Checkbox({ checked, indeterminate, onChange }) {
  return (
    <div onClick={e => { e.stopPropagation(); onChange(); }}
      style={{
        width: 17, height: 17, borderRadius: 5, cursor: "pointer", flexShrink: 0,
        background: checked || indeterminate ? T.greenTeal : T.white,
        border: checked || indeterminate ? "none" : `2px solid ${T.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: checked ? "0 2px 6px rgba(61,220,132,0.35)" : "none",
        transition: "all 0.15s",
      }}>
      {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      {indeterminate && !checked && <div style={{ width: 8, height: 2, background: "#fff", borderRadius: 2 }} />}
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon: Icon, accent }) {
  return (
    <div style={{
      background: T.white, border: `1px solid ${T.border}`, borderRadius: 14,
      padding: "18px 20px", display: "flex", alignItems: "center", gap: 14,
      boxShadow: "0 2px 8px rgba(10,36,68,0.05)",
    }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
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

// ── Btn ───────────────────────────────────────────────────────────────────────
function Btn({ label, icon: Icon, onClick, variant = "default", small }) {
  const s = {
    primary: { bg: T.greenTeal, color: "#fff", border: "none", shadow: "0 2px 8px rgba(61,220,132,0.3)" },
    danger:  { bg: "linear-gradient(135deg,#ff4e4e,#e02020)", color: "#fff", border: "none", shadow: "0 2px 8px rgba(255,78,78,0.3)" },
    warning: { bg: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#fff", border: "none", shadow: "0 2px 8px rgba(245,158,11,0.3)" },
    navy:    { bg: T.navyTeal, color: "#fff", border: "none", shadow: "0 2px 8px rgba(10,36,68,0.2)" },
    default: { bg: T.white, color: T.textMid, border: `1px solid ${T.border}`, shadow: "none" },
  }[variant] || {};
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: small ? "5px 10px" : "7px 13px",
      borderRadius: 8, cursor: "pointer", fontSize: small ? 11 : 12,
      fontWeight: 600, whiteSpace: "nowrap",
      background: s.bg, color: s.color, border: s.border, boxShadow: s.shadow,
      transition: "opacity 0.15s", fontFamily: "'DM Sans','Segoe UI',sans-serif",
    }}
      onMouseOver={e => e.currentTarget.style.opacity = "0.85"}
      onMouseOut={e => e.currentTarget.style.opacity = "1"}>
      {Icon && <Icon size={13} />}{label}
    </button>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
const badgeMeta = {
  "Elite++": { color: "#7c3aed", bg: "#f5f3ff", icon: Star },
  "Pro+":    { color: "#0891b2", bg: "#ecfeff", icon: Award },
  "Verified":{ color: "#059669", bg: "#ecfdf5", icon: CheckCircle },
};
function Badge({ label }) {
  const m = badgeMeta[label] || { color: T.muted, bg: "#f4f7ff", icon: CheckCircle };
  const Icon = m.icon;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      fontSize: 11, fontWeight: 700, color: m.color, background: m.bg,
      padding: "3px 8px", borderRadius: 20, border: `1px solid ${m.color}22`,
    }}>
      <Icon size={11} />{label}
    </span>
  );
}

// ── Visibility Badge ───────────────────────────────────────────────────────────
const visMeta = {
  Boosted: { color: "#059669", bg: "#ecfdf5" },
  Normal:  { color: T.muted,   bg: "#f4f7ff" },
  Reduced: { color: "#d97706", bg: "#fffbeb" },
  Hidden:  { color: "#ef4444", bg: "#fef2f2" },
};
function VisBadge({ v }) {
  const m = visMeta[v] || visMeta.Normal;
  return (
    <span style={{ fontSize: 11, fontWeight: 700, color: m.color, background: m.bg, padding: "3px 8px", borderRadius: 20 }}>{v}</span>
  );
}

// ── Skill Bar ─────────────────────────────────────────────────────────────────
function SkillBar({ score }) {
  const color = score >= 80 ? T.greenTeal : score >= 60 ? "linear-gradient(90deg,#f59e0b,#d97706)" : "linear-gradient(90deg,#ff4e4e,#e02020)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 64, height: 6, background: T.border, borderRadius: 10, overflow: "hidden" }}>
        <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 10 }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>{score}</span>
    </div>
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────
function UserAvatar({ name }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();
  return (
    <div style={{
      width: 34, height: 34, borderRadius: "50%", background: T.navyTeal,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0,
    }}>{initials}</div>
  );
}

// ── Rate color helper ─────────────────────────────────────────────────────────
function rateColor(val, goodHigh = true) {
  const n = parseFloat(val);
  if (goodHigh) return n >= 90 ? "#059669" : n >= 75 ? "#d97706" : "#ef4444";
  return n > 10 ? "#ef4444" : n > 5 ? "#d97706" : "#059669";
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function AdminFreelancers() {
  const navigate = useNavigate();
  const [search, setSearch]               = useState("");
  const [badgeFilter, setBadgeFilter]     = useState("");
  const [visFilter, setVisFilter]         = useState("");
  const [riskFilter, setRiskFilter]       = useState("");
  const [selected, setSelected]           = useState([]);
  const [page, setPage]                   = useState(1);

  const filtered = useMemo(() => mockFreelancers.filter(f => {
    const q = search.toLowerCase();
    return (
      (f.name.toLowerCase().includes(q) || f.email.toLowerCase().includes(q) || f.primarySkill.toLowerCase().includes(q)) &&
      (!badgeFilter || f.badge      === badgeFilter) &&
      (!visFilter   || f.visibility === visFilter)   &&
      (!riskFilter  || f.riskFlag   === riskFilter)
    );
  }), [search, badgeFilter, visFilter, riskFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage   = Math.min(page, totalPages);
  const paged      = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const allSelected  = paged.length > 0 && paged.every(f => selected.includes(f.id));
  const someSelected = paged.some(f => selected.includes(f.id)) && !allSelected;
  const toggleOne    = id => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleAll    = () => setSelected(allSelected ? selected.filter(id => !paged.find(f => f.id === id)) : [...new Set([...selected, ...paged.map(f => f.id)])]);

  const stats = {
    total:   mockFreelancers.length,
    elite:   mockFreelancers.filter(f => f.badge !== "Verified").length,
    highDis: mockFreelancers.filter(f => parseInt(f.disputeRate) > 10).length,
    reduced: mockFreelancers.filter(f => f.visibility === "Reduced" || f.visibility === "Hidden").length,
  };

  const th = { fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: 0.8, padding: "10px 14px", borderBottom: `1px solid ${T.border}`, background: "#f8faff", whiteSpace: "nowrap" };
  const td = { padding: "11px 14px", borderBottom: `1px solid ${T.border}`, verticalAlign: "middle" };

  const selectedRows = mockFreelancers.filter(f => selected.includes(f.id));

  return (
    <div style={{ padding: 24, background: T.bg, minHeight: "100%", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: T.navy, letterSpacing: -0.5 }}>Freelancers</h1>
          <p style={{ margin: "3px 0 0", fontSize: 13, color: T.muted }}>Manage & monitor your freelancer workforce quality</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {selected.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "6px 12px" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.navy }}>{selected.length} selected</span>
              <Btn label="Warn"            variant="warning" small />
              <Btn label="Suspend"         variant="danger"  small />
              <Btn label="Export Selected" icon={Download} variant="default" small onClick={() => exportCSV(selectedRows)} />
              <button onClick={() => setSelected([])} style={{ background: "none", border: "none", cursor: "pointer", color: T.muted, display: "flex", alignItems: "center" }}><X size={14} /></button>
            </div>
          )}
          <Btn label="Export All" icon={Download} variant="navy" onClick={() => exportCSV(filtered)} />
        </div>
      </div>

      {/* ── Stats ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 }}>
        <StatCard label="Total Freelancers"  value={stats.total}   icon={Briefcase}      accent={T.navyTeal} />
        <StatCard label="Elite++ / Pro+"     value={stats.elite}   icon={Star}           accent="linear-gradient(135deg,#7c3aed,#6d28d9)" />
        <StatCard label="High Dispute Rate"  value={stats.highDis} icon={AlertTriangle}  accent="linear-gradient(135deg,#f59e0b,#d97706)" sub="> 10% disputes" />
        <StatCard label="Visibility Reduced" value={stats.reduced} icon={EyeOff}         accent="linear-gradient(135deg,#ff4e4e,#e02020)" />
      </div>

      {/* ── Table Card ── */}
      <div style={{ background: T.white, borderRadius: 16, border: `1px solid ${T.border}`, boxShadow: "0 2px 12px rgba(10,36,68,0.06)", overflow: "hidden" }}>

        {/* Filter bar */}
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: T.muted }} />
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search name, skill, email…"
              style={{ width: "100%", paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, color: T.textDark, background: "#f8faff", outline: "none", boxSizing: "border-box" }} />
          </div>
          {[
            { val: badgeFilter, set: setBadgeFilter, label: "All Badges",     opts: ["Elite++","Pro+","Verified"] },
            { val: visFilter,   set: setVisFilter,   label: "All Visibility", opts: ["Boosted","Normal","Reduced","Hidden"] },
            { val: riskFilter,  set: setRiskFilter,  label: "All Risk",       opts: ["Low","Medium","High"] },
          ].map(f => (
            <select key={f.label} value={f.val} onChange={e => { f.set(e.target.value); setPage(1); }}
              style={{ padding: "8px 12px", border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12, color: f.val ? T.navy : T.muted, background: f.val ? "#f0f4ff" : "#f8faff", outline: "none", cursor: "pointer", fontWeight: f.val ? 600 : 400 }}>
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
                {["Freelancer","Primary Skill","Badge","Skill Score","Trust","Active","Completed","Dispute %","On-Time","Visibility","Risk","Actions"].map(h => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr><td colSpan={13} style={{ ...td, textAlign: "center", padding: "48px 0", color: T.muted, fontSize: 13 }}>No freelancers match your filters</td></tr>
              ) : paged.map(f => {
                const isSel = selected.includes(f.id);
                return (
                  <tr key={f.id} onClick={() => navigate(`/admin/freelancers/${f.id}`)}
                    style={{ cursor: "pointer", background: isSel ? "linear-gradient(90deg,rgba(61,220,132,0.06),rgba(26,181,200,0.04))" : "transparent", transition: "background 0.12s" }}
                    onMouseOver={e => { if (!isSel) e.currentTarget.style.background = "#f8faff"; }}
                    onMouseOut={e => { if (!isSel) e.currentTarget.style.background = "transparent"; }}>

                    {/* Checkbox */}
                    <td style={{ ...td, textAlign: "center" }} onClick={e => e.stopPropagation()}>
                      <Checkbox checked={isSel} onChange={() => toggleOne(f.id)} />
                    </td>

                    {/* Freelancer */}
                    <td style={td}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <UserAvatar name={f.name} />
                        <div>
                          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: T.navy }}>{f.name}</p>
                          <p style={{ margin: 0, fontSize: 11, color: T.muted }}>{f.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Skill */}
                    <td style={{ ...td, fontSize: 12, color: T.textMid, whiteSpace: "nowrap" }}>{f.primarySkill}</td>

                    {/* Badge */}
                    <td style={td}><Badge label={f.badge} /></td>

                    {/* Skill Score */}
                    <td style={td}><SkillBar score={f.skillScore} /></td>

                    {/* Trust */}
                    <td style={td}><TrustScore score={f.trustScore} /></td>

                    {/* Active */}
                    <td style={{ ...td, textAlign: "center" }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{f.activeProjects}</span>
                    </td>

                    {/* Completed */}
                    <td style={{ ...td, textAlign: "center" }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{f.completedProjects}</span>
                    </td>

                    {/* Dispute % */}
                    <td style={td}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: rateColor(f.disputeRate, false) }}>{f.disputeRate}</span>
                    </td>

                    {/* On-Time */}
                    <td style={td}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: rateColor(f.onTimeDelivery, true) }}>{f.onTimeDelivery}</span>
                    </td>

                    {/* Visibility */}
                    <td style={td}><VisBadge v={f.visibility} /></td>

                    {/* Risk */}
                    <td style={td}><RiskFlag level={f.riskFlag} /></td>

                    {/* Actions — always visible */}
                    <td style={{ ...td, whiteSpace: "nowrap" }} onClick={e => e.stopPropagation()}>
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <button onClick={() => navigate(`/admin/freelancers/${f.id}`)}
                          style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: "pointer", background: T.greenTeal, color: "#fff", border: "none", boxShadow: "0 2px 6px rgba(61,220,132,0.3)" }}>
                          <Eye size={12} /> View
                        </button>
                        <button style={{ display: "flex", alignItems: "center", padding: "5px 8px", borderRadius: 7, cursor: "pointer", background: T.white, color: T.muted, border: `1px solid ${T.border}` }}>
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
            Showing <b style={{ color: T.navy }}>{Math.min((safePage-1)*PAGE_SIZE+1, filtered.length)}–{Math.min(safePage*PAGE_SIZE, filtered.length)}</b> of <b style={{ color: T.navy }}>{filtered.length}</b> freelancers
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={safePage===1}
              style={{ padding: "6px 10px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: safePage===1?"not-allowed":"pointer", background: T.white, color: safePage===1?T.muted:T.navy, border: `1px solid ${T.border}`, opacity: safePage===1?0.5:1 }}>
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_,i) => i+1)
              .filter(p => p===1 || p===totalPages || Math.abs(p-safePage)<=1)
              .reduce((acc,p,idx,arr) => { if(idx>0&&p-arr[idx-1]>1) acc.push("…"); acc.push(p); return acc; }, [])
              .map((p,i) => p==="…"
                ? <span key={`e${i}`} style={{ padding: "0 4px", color: T.muted, fontSize: 12 }}>…</span>
                : <button key={p} onClick={() => setPage(p)}
                    style={{ width: 32, height: 32, borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", background: p===safePage ? T.greenTeal : T.white, color: p===safePage?"#fff":T.navy, border: p===safePage?"none":`1px solid ${T.border}`, boxShadow: p===safePage?"0 2px 8px rgba(61,220,132,0.3)":"none" }}>{p}</button>
              )}
            <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={safePage===totalPages}
              style={{ padding: "6px 10px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: safePage===totalPages?"not-allowed":"pointer", background: T.white, color: safePage===totalPages?T.muted:T.navy, border: `1px solid ${T.border}`, opacity: safePage===totalPages?0.5:1 }}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}