import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockClients } from "./mockData";

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
};
const FONT = "'Poppins', sans-serif";


/* ═══════════════════════════════════════════════
   SHARED MINI-COMPONENTS
═══════════════════════════════════════════════ */
function Avatar({ name, size = "sm" }) {
  const palette = ["#3b82f6","#8b5cf6","#f59e0b","#ef4444","#6EC030","#1A2B5E","#0ea5e9","#ec4899"];
  const color   = palette[name.charCodeAt(0) % palette.length];
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const sz = size === "lg" ? 52 : size === "md" ? 40 : 32;
  return (
    <div style={{
      width: sz, height: sz, borderRadius: "50%",
      background: color + "20", border: `1.5px solid ${color}44`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size === "lg" ? 16 : size === "md" ? 13 : 11,
      fontWeight: 700, color, flexShrink: 0,
    }}>{initials}</div>
  );
}

function StatusBadge({ status }) {
  const map = {
    Active:      { bg: G.greenBg,  text: G.greenDeep, dot: G.green  },
    Pending:     { bg: G.amberBg,  text: G.amberText, dot: G.amber  },
    Suspended:   { bg: G.amberBg,  text: G.amberText, dot: G.amber  },
    Banned:      { bg: G.redBg,    text: G.redText,   dot: G.red    },
    Verified:    { bg: G.greenBg,  text: G.greenDeep, dot: G.green  },
    Unverified:  { bg: G.bg,       text: G.muted,     dot: G.muted  },
    Rejected:    { bg: G.redBg,    text: G.redText,   dot: G.red    },
    "In Progress":{ bg: G.amberBg, text: G.amberText, dot: G.amber  },
    Completed:   { bg: G.greenBg,  text: G.greenDeep, dot: G.green  },
  };
  const s = map[status] || { bg: G.bg, text: G.muted, dot: G.muted };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 11, fontWeight: 700,
      background: s.bg, color: s.text,
      padding: "3px 10px", borderRadius: 99,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}

function TrustScore({ score }) {
  const color = score >= 75 ? G.greenDeep : score >= 50 ? "#b45309" : G.redText;
  const bg    = score >= 75 ? G.greenBg   : score >= 50 ? G.amberBg  : G.redBg;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
      <div style={{ width: 48, height: 5, background: G.border, borderRadius: 99, overflow: "hidden" }}>
        <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 99 }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color, background: bg, padding: "2px 7px", borderRadius: 99 }}>{score}</span>
    </div>
  );
}

function RiskFlag({ level }) {
  const map = {
    Low:    { bg: G.greenBg, text: G.greenDeep, dot: G.green },
    Medium: { bg: G.amberBg, text: G.amberText, dot: G.amber },
    High:   { bg: G.redBg,   text: G.redText,   dot: G.red   },
  };
  const s = map[level] || map.Low;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 11, fontWeight: 700,
      background: s.bg, color: s.text,
      padding: "3px 10px", borderRadius: 99,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />
      {level}
    </span>
  );
}

function StatCard({ label, value, sub, color = "gray" }) {
  const map = {
    gray:   { bg: G.bg,      border: G.border,       val: G.text,     lbl: G.muted      },
    green:  { bg: G.greenBg, border: G.greenBorder,  val: G.greenDeep,lbl: G.greenDeep  },
    orange: { bg: G.amberBg, border: G.amberBorder,  val: "#b45309",  lbl: "#b45309"    },
    red:    { bg: G.redBg,   border: G.redBorder,    val: G.redText,  lbl: G.redText    },
    blue:   { bg: G.blueBg,  border: G.blueBorder,   val: G.blueText, lbl: G.blueText   },
  };
  const c = map[color] || map.gray;
  return (
    <div style={{
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: 14, padding: "16px 20px", flex: 1, minWidth: 0,
      boxShadow: "0 2px 8px rgba(110,192,48,0.05)",
    }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: c.lbl, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{label}</p>
      <p style={{ fontSize: 26, fontWeight: 800, color: c.val, margin: 0, lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: G.muted, marginTop: 5 }}>{sub}</p>}
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div style={{
      background: G.white,
      border: `1px solid ${G.greenBorder}`,
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 2px 12px rgba(110,192,48,0.06)",
    }}>
      <div style={{
        padding: "14px 20px",
        borderBottom: `1px solid ${G.greenBorder}`,
        background: G.greenBg,
      }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0 }}>{title}</p>
      </div>
      <div style={{ padding: "16px 20px" }}>{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "9px 0",
      borderBottom: `1px solid ${G.border}`,
    }}>
      <span style={{ fontSize: 12, color: G.muted, fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: G.text }}>{value}</span>
    </div>
  );
}

const btnNavy = {
  display: "inline-flex", alignItems: "center", gap: 6,
  fontSize: 12, fontWeight: 700, fontFamily: FONT,
  background: G.gradNavy, color: G.white,
  border: "none", borderRadius: 100,
  padding: "8px 18px", cursor: "pointer",
  boxShadow: "0 3px 12px rgba(15,26,59,0.25)",
  whiteSpace: "nowrap",
};
const btnGreen = {
  display: "inline-flex", alignItems: "center", gap: 6,
  fontSize: 12, fontWeight: 700, fontFamily: FONT,
  background: G.gradGreen, color: G.white,
  border: "none", borderRadius: 100,
  padding: "8px 18px", cursor: "pointer",
  boxShadow: "0 2px 10px rgba(46,125,31,0.22)",
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
const btnWarning = {
  ...btnOutline,
  background: G.amberBg, color: G.amberText, border: `1px solid ${G.amberBorder}`,
};
const btnDanger = {
  ...btnOutline,
  background: G.redBg, color: G.redText, border: `1px solid ${G.redBorder}`,
};

/* ═══════════════════════════════════════════════
   LIST PAGE
═══════════════════════════════════════════════ */
export function AdminClients() {
  const navigate = useNavigate();
  const [search,     setSearch]     = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [verFilter,  setVerFilter]  = useState("");
  const [hovRow,     setHovRow]     = useState(null);

  const filtered = mockClients.filter((c) => {
    const q           = search.toLowerCase();
    const matchSearch = c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || (c.company || "").toLowerCase().includes(q);
    const matchType   = !typeFilter || c.clientType         === typeFilter;
    const matchRisk   = !riskFilter || c.riskLevel          === riskFilter;
    const matchVer    = !verFilter  || c.verificationStatus === verFilter;
    return matchSearch && matchType && matchRisk && matchVer;
  });

  const payColor  = { Excellent: G.greenDeep, Average: "#b45309",  Poor: G.redText,  Unknown: G.muted };
  const scopeColor= { Low: G.greenDeep,       Medium: "#b45309",   High: G.redText,  "N/A":   G.muted };

  const HEADERS = ["Client","Type","KYC","Trust","Projects","Spent","Active","Disputes","Pay Reliability","Scope Changes","Risk","Actions"];

  return (
    <div style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family:'Poppins',sans-serif; }
        input[type=text], select, textarea { outline: none; font-family:'Poppins',sans-serif; }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.4px" }}>Clients</h1>
          <p style={{ fontSize: 13, color: G.muted, marginTop: 3 }}>Monitor the demand side — who is posting, paying &amp; behaving</p>
        </div>
        <button style={btnNavy}>⬇ Export</button>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
        <StatCard label="Total Clients" value={mockClients.length} color="gray" />
        <StatCard label="Verified"      value={mockClients.filter(c => c.verificationStatus === "Verified").length} color="green" />
        <StatCard label="AI Flagged"    value={mockClients.filter(c => c.aiFlag).length} sub="Needs review" color="orange" />
        <StatCard
          label="Total Spent (All)"
          value={`₹${(mockClients.reduce((s, c) => s + (c.totalSpent || 0), 0) / 100000).toFixed(1)}L`}
          color="blue"
        />
      </div>

      {/* Table card */}
      <div style={{
        background: G.white, border: `1px solid ${G.greenBorder}`,
        borderRadius: 16, overflow: "hidden",
        boxShadow: "0 2px 12px rgba(110,192,48,0.06)",
      }}>

        {/* Filter bar */}
        <div style={{
          padding: "14px 20px", background: G.greenBg,
          borderBottom: `1px solid ${G.greenBorder}`,
          display: "flex", flexWrap: "wrap", gap: 10,
          alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", flex: 1 }}>
            <div style={{ position: "relative", flex: "1 1 200px", maxWidth: 280 }}>
              <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: G.muted }}>🔍</span>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search name, company, email…"
                style={{
                  width: "100%", fontSize: 12, fontWeight: 500,
                  border: `1.5px solid ${G.greenBorder}`, borderRadius: 100,
                  padding: "8px 12px 8px 32px", background: G.white, color: G.text,
                  boxSizing: "border-box",
                }}
              />
            </div>
            {[
              { value: typeFilter, setter: setTypeFilter, label: "All Types", opts: ["Individual","Startup","Enterprise"] },
              { value: verFilter,  setter: setVerFilter,  label: "All KYC",   opts: ["Verified","Unverified","Rejected"]  },
              { value: riskFilter, setter: setRiskFilter, label: "All Risk",  opts: ["Low","Medium","High"]               },
            ].map(({ value, setter, label, opts }) => (
              <select key={label} value={value} onChange={e => setter(e.target.value)}
                style={{
                  fontSize: 12, fontWeight: 600,
                  border: `1.5px solid ${value ? G.green : G.greenBorder}`,
                  borderRadius: 100, padding: "8px 14px",
                  background: value ? G.greenBg : G.white,
                  color: value ? G.greenDeep : G.sub, cursor: "pointer",
                }}>
                <option value="">{label}</option>
                {opts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            ))}
          </div>
          <span style={{ fontSize: 11, color: G.muted, fontWeight: 600 }}>{filtered.length} results</span>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1100 }}>
            <thead>
              <tr style={{ background: G.bg, borderBottom: `1px solid ${G.greenBorder}` }}>
                {HEADERS.map(h => (
                  <th key={h} style={{
                    padding: "10px 14px", fontSize: 10, fontWeight: 700,
                    color: G.muted, textTransform: "uppercase",
                    letterSpacing: "0.07em", textAlign: "left", whiteSpace: "nowrap",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}
                  style={{
                    borderBottom: `1px solid ${G.border}`,
                    background: hovRow === c.id ? G.greenBg : G.white,
                    cursor: "pointer", transition: "background 0.1s",
                  }}
                  onMouseEnter={() => setHovRow(c.id)}
                  onMouseLeave={() => setHovRow(null)}
                  onClick={() => navigate(`/admin/clients/${c.id}`)}
                >
                  {/* Client */}
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={c.name} size="sm" />
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: G.text }}>{c.name}</span>
                          {c.aiFlag && (
                            <span style={{ fontSize: 9, fontWeight: 700, background: G.redBg, color: G.red, border: `1px solid ${G.redBorder}`, padding: "1px 6px", borderRadius: 99 }}>AI⚑</span>
                          )}
                        </div>
                        {c.company && <span style={{ fontSize: 11, color: G.muted, display: "block" }}>{c.company}</span>}
                        <span style={{ fontSize: 11, color: G.muted, display: "block" }}>{c.email}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: G.sub }}>{c.clientType}</span>
                  </td>
                  <td style={{ padding: "12px 14px" }}><StatusBadge status={c.verificationStatus} /></td>
                  <td style={{ padding: "12px 14px" }}><TrustScore score={c.trustScore} /></td>
                  <td style={{ padding: "12px 14px", textAlign: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: G.text }}>{c.totalProjects}</span>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: G.text }}>{c.totalSpent > 0 ? `₹${(c.totalSpent / 1000).toFixed(0)}k` : "—"}</span>
                  </td>
                  <td style={{ padding: "12px 14px", textAlign: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: G.text }}>{c.activeProjects}</span>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: c.disputeInitiationRate !== "N/A" && parseInt(c.disputeInitiationRate) > 20 ? G.redText : G.sub }}>
                      {c.disputeInitiationRate}
                    </span>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: payColor[c.paymentReliability] || G.muted }}>{c.paymentReliability}</span>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: scopeColor[c.scopeChangeFreq] || G.muted }}>{c.scopeChangeFreq}</span>
                  </td>
                  <td style={{ padding: "12px 14px" }}><RiskFlag level={c.riskLevel} /></td>
                  <td style={{ padding: "12px 14px" }} onClick={e => e.stopPropagation()}>
                    <div style={{ opacity: hovRow === c.id ? 1 : 0, transition: "opacity 0.15s" }}>
                      <button
                        onClick={e => { e.stopPropagation(); navigate(`/admin/clients/${c.id}`); }}
                        style={{
                          fontSize: 11, fontWeight: 700, fontFamily: FONT,
                          background: G.gradNavy, color: G.white,
                          border: "none", borderRadius: 100,
                          padding: "6px 14px", cursor: "pointer",
                          boxShadow: "0 2px 8px rgba(15,26,59,0.22)",
                        }}>View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty */}
        {filtered.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "56px 20px", textAlign: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: G.greenBg, border: `1px solid ${G.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 12 }}>◎</div>
            <p style={{ fontSize: 14, fontWeight: 700, color: G.text }}>No clients match your filters</p>
          </div>
        )}

        {/* Footer */}
        <div style={{
          padding: "12px 20px", background: G.greenBg,
          borderTop: `1px solid ${G.greenBorder}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontSize: 11, color: G.muted, fontWeight: 600 }}>Showing {filtered.length} of {mockClients.length} clients</span>
          <div style={{ display: "flex", gap: 6 }}>
            {["← Prev","Next →"].map(label => (
              <button key={label} style={{
                fontSize: 12, fontWeight: 600, fontFamily: FONT,
                padding: "7px 14px", border: `1px solid ${G.greenBorder}`,
                borderRadius: 100, background: G.white, color: G.greenDeep, cursor: "pointer",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = G.greenBg; e.currentTarget.style.borderColor = G.green; }}
                onMouseLeave={e => { e.currentTarget.style.background = G.white;   e.currentTarget.style.borderColor = G.greenBorder; }}
              >{label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   DETAIL PAGE
═══════════════════════════════════════════════ */
export function AdminClientDetail() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [note,      setNote]      = useState("");
  const [notes,     setNotes]     = useState([]);

  const c = mockClients.find(x => x.id === id);

  if (!c) return (
    <div style={{ padding: 48, textAlign: "center", fontFamily: FONT }}>
      <p style={{ color: G.muted, marginBottom: 16 }}>Client not found</p>
      <button onClick={() => navigate("/admin/clients")} style={btnOutline}>← Back</button>
    </div>
  );

  const tabs      = ["overview","projects","financials","behavior","admin"];
  const payColor  = { Excellent: G.greenDeep, Average: "#b45309", Poor: G.redText, Unknown: G.muted };

  return (
    <div style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>
      <style>{`* { font-family:'Poppins',sans-serif; } input,select,textarea { outline:none; font-family:'Poppins',sans-serif; }`}</style>

      {/* Back */}
      <button onClick={() => navigate("/admin/clients")}
        style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: G.sub, background: "none", border: "none", cursor: "pointer", marginBottom: 18, padding: 0 }}
        onMouseEnter={e => e.currentTarget.style.color = G.text}
        onMouseLeave={e => e.currentTarget.style.color = G.sub}
      >← All Clients</button>

      {/* ── Profile header ── */}
      <div style={{
        background: G.white, border: `1px solid ${G.greenBorder}`,
        borderRadius: 16, padding: "22px 24px", marginBottom: 20,
        boxShadow: "0 2px 12px rgba(110,192,48,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Avatar name={c.name} size="lg" />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                <h1 style={{ fontSize: 20, fontWeight: 800, color: G.text, margin: 0 }}>{c.name}</h1>
                <StatusBadge status={c.verificationStatus} />
                {c.aiFlag && (
                  <span style={{ fontSize: 10, fontWeight: 700, background: G.redBg, color: G.redText, border: `1px solid ${G.redBorder}`, padding: "2px 8px", borderRadius: 99 }}>⚑ AI Flagged</span>
                )}
                {c.warnings > 0 && (
                  <span style={{ fontSize: 10, fontWeight: 700, background: G.amberBg, color: G.amberText, border: `1px solid ${G.amberBorder}`, padding: "2px 8px", borderRadius: 99 }}>
                    ⚠ {c.warnings} Warning{c.warnings > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <p style={{ fontSize: 12, color: G.muted, margin: "0 0 8px" }}>
                {c.email} · {c.id} · {c.clientType}{c.company ? ` · ${c.company}` : ""}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <TrustScore score={c.trustScore} />
                <RiskFlag level={c.riskLevel} />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <button style={btnWarning}>Send Warning</button>
            <button style={btnOutline}>Restrict Posting</button>
            <button style={btnDanger}>Suspend</button>
          </div>
        </div>
      </div>

      {/* ── Quick stats ── */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { label: "Total Projects",  value: c.totalProjects,                                                            color: "gray"   },
          { label: "Total Spent",     value: c.totalSpent > 0 ? `₹${(c.totalSpent / 1000).toFixed(0)}k` : "—",          color: "blue"   },
          { label: "Active Projects", value: c.activeProjects,                                                           color: "green"  },
          { label: "Escrow Locked",   value: c.escrowLocked > 0 ? `₹${(c.escrowLocked / 1000).toFixed(0)}k` : "—",     color: "orange" },
          { label: "Warnings Issued", value: c.warnings,                                                                 color: c.warnings > 0 ? "red" : "gray" },
        ].map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* ── Tabs ── */}
      <div style={{
        display: "flex", borderBottom: `1px solid ${G.greenBorder}`,
        marginBottom: 22, background: G.white,
        borderRadius: "12px 12px 0 0",
        border: `1px solid ${G.greenBorder}`,
        overflow: "hidden",
      }}>
        {tabs.map(tab => {
          const active = activeTab === tab;
          return (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{
                padding: "12px 18px", fontSize: 13,
                fontWeight: active ? 700 : 500,
                color: active ? G.navy : G.muted,
                background: active ? G.greenBg : "none",
                border: "none",
                borderBottom: active ? `2px solid ${G.green}` : "2px solid transparent",
                cursor: "pointer", textTransform: "capitalize",
                fontFamily: FONT, transition: "all 0.12s",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = G.text; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = G.muted; }}
            >{tab}</button>
          );
        })}
      </div>

      {/* ── Overview ── */}
      {activeTab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <SectionCard title="Client Identity">
              {[
                ["Full Name",           c.name],
                ["Email",               c.email],
                ["Company",             c.company || "—"],
                ["Client Type",         c.clientType],
                ["Country",             c.country],
                ["Preferred Currency",  c.preferredCurrency],
                ["Billing Address",     c.billingAddress || "—"],
                ["Joined",              c.joinDate],
              ].map(([label, value]) => <InfoRow key={label} label={label} value={value} />)}
            </SectionCard>

            <SectionCard title="Refund History">
              {c.refundHistory.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {c.refundHistory.map((r, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "12px 14px", background: G.redBg,
                      border: `1px solid ${G.redBorder}`, borderRadius: 10,
                    }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: G.text, margin: 0 }}>{r.reason}</p>
                        <p style={{ fontSize: 11, color: G.muted, marginTop: 2 }}>{r.date}</p>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 800, color: G.redText }}>₹{r.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: 13, color: G.muted, textAlign: "center", padding: "16px 0" }}>No refunds issued</p>
              )}
            </SectionCard>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <SectionCard title="Behavior Profile">
              {[
                { label: "Payment Reliability", value: c.paymentReliability, color: payColor[c.paymentReliability] },
                { label: "Scope Change Freq.",  value: c.scopeChangeFreq,    color: c.scopeChangeFreq === "High" ? G.redText : c.scopeChangeFreq === "Medium" ? "#b45309" : G.greenDeep },
                { label: "Dispute Rate",        value: c.disputeInitiationRate, color: c.disputeInitiationRate !== "N/A" && parseInt(c.disputeInitiationRate) > 20 ? G.redText : G.text },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${G.border}` }}>
                  <span style={{ fontSize: 12, color: G.muted }}>{item.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: item.color }}>{item.value}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${G.border}` }}>
                <span style={{ fontSize: 12, color: G.muted }}>Risk Level</span>
                <RiskFlag level={c.riskLevel} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0" }}>
                <span style={{ fontSize: 12, color: G.muted }}>KYC Status</span>
                <StatusBadge status={c.verificationStatus} />
              </div>
            </SectionCard>

            <SectionCard title="Admin Notes (Internal)">
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                {notes.length === 0 && (
                  <p style={{ fontSize: 12, color: G.muted, textAlign: "center", padding: "8px 0" }}>No notes yet</p>
                )}
                {notes.map((n, i) => (
                  <div key={i} style={{ padding: "10px 12px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 10 }}>
                    <p style={{ fontSize: 12, color: G.text, margin: 0 }}>{n.text}</p>
                    <p style={{ fontSize: 10, color: G.muted, marginTop: 4 }}>Super Admin · {n.date}</p>
                  </div>
                ))}
              </div>
              <textarea
                value={note} onChange={e => setNote(e.target.value)}
                placeholder="Internal note (not visible to client)…"
                rows={3}
                style={{
                  width: "100%", fontSize: 12, fontWeight: 500,
                  border: `1.5px solid ${G.greenBorder}`, borderRadius: 10,
                  padding: "10px 12px", resize: "none",
                  background: G.white, color: G.text,
                  boxSizing: "border-box", marginBottom: 10,
                }}
                onFocus={e => e.target.style.borderColor = G.green}
                onBlur={e  => e.target.style.borderColor = G.greenBorder}
              />
              <button style={btnGreen}
                onClick={() => { if (note.trim()) { setNotes([{ text: note, date: "Mar 25, 2026" }, ...notes]); setNote(""); } }}>
                Save Note
              </button>
            </SectionCard>
          </div>
        </div>
      )}

      {/* ── Projects ── */}
      {activeTab === "projects" && (
        <SectionCard title="Project History">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { name: "Patient Appointment App", talent: "HealthFirst Dev Team", status: "In Progress", budget: "₹3,20,000" },
              { name: "Website Revamp",           talent: "Arjun Dev",           status: "Completed",   budget: "₹85,000"   },
            ].map((p, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 16px", background: G.bg,
                border: `1px solid ${G.greenBorder}`, borderRadius: 12,
              }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0 }}>{p.name}</p>
                  <p style={{ fontSize: 12, color: G.muted, marginTop: 2 }}>{p.talent}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <StatusBadge status={p.status} />
                  <p style={{ fontSize: 14, fontWeight: 800, color: G.text, marginTop: 6 }}>{p.budget}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* ── Financials ── */}
      {activeTab === "financials" && (
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[
            { label: "Total Spent",   value: c.totalSpent   > 0 ? `₹${c.totalSpent.toLocaleString()}`   : "₹0", color: "blue"   },
            { label: "Escrow Locked", value: c.escrowLocked > 0 ? `₹${c.escrowLocked.toLocaleString()}` : "₹0", color: "orange" },
            { label: "Total Refunds", value: c.refundHistory.length > 0 ? `₹${c.refundHistory.reduce((s, r) => s + r.amount, 0).toLocaleString()}` : "₹0", color: "red" },
          ].map(s => (
            <div key={s.label} style={{ flex: 1, minWidth: 180 }}>
              <StatCard {...s} />
            </div>
          ))}
        </div>
      )}

      {/* ── Behavior ── */}
      {activeTab === "behavior" && (
        <SectionCard title="AI Behavior Analysis">
          <div style={{
            padding: "16px", borderRadius: 12, marginBottom: 16,
            background: c.riskLevel === "High" ? G.redBg : G.greenBg,
            border: `1px solid ${c.riskLevel === "High" ? G.redBorder : G.greenBorder}`,
          }}>
            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, color: c.riskLevel === "High" ? G.redText : G.greenDeep }}>AI Assessment</p>
            <p style={{ fontSize: 13, color: c.riskLevel === "High" ? "#b91c1c" : "#166534", lineHeight: 1.6, margin: 0 }}>
              {c.riskLevel === "High"
                ? "This client shows patterns of dispute abuse, scope manipulation, and payment delays. Recommend enhanced monitoring and restrict high-value project posting."
                : c.riskLevel === "Medium"
                ? "This client shows moderate scope change frequency. AI recommends stricter milestone agreements for future projects."
                : "This client demonstrates consistent, professional behavior with strong payment reliability and low dispute history."}
            </p>
          </div>
          <InfoRow label="Comm. Tone Trend"  value="Professional" />
          <InfoRow label="Scope Compliance"  value={c.scopeChangeFreq === "Low" ? "High" : "Low"} />
          <InfoRow label="Policy Violations" value={c.warnings > 0 ? `${c.warnings} recorded` : "None"} />
          <InfoRow label="Platform Policy"   value={c.warnings > 0 ? "Warning issued" : "Compliant"} />
        </SectionCard>
      )}

      {/* ── Admin ── */}
      {activeTab === "admin" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <SectionCard title="Admin Control Panel">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Send Official Warning",      style: btnWarning  },
                { label: "Force Escrow Pre-funding",   style: btnOutline  },
                { label: "Restrict Project Posting",   style: btnOutline  },
                { label: "Restrict Hiring",            style: btnOutline  },
                { label: "Suspend Account",            style: btnDanger   },
              ].map(action => (
                <button key={action.label} style={{ ...action.style, width: "100%", justifyContent: "flex-start", borderRadius: 10 }}>
                  {action.label}
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Audit Log">
            {c.warnings > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[...Array(c.warnings)].map((_, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    padding: "10px 12px", background: G.amberBg,
                    border: `1px solid ${G.amberBorder}`, borderRadius: 10,
                  }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: G.amber, marginTop: 4, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 600, color: G.text, margin: 0 }}>Warning issued — policy violation</p>
                      <p style={{ fontSize: 10, color: G.muted, marginTop: 3 }}>Platform Admin · Feb 2026</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: 13, color: G.muted, textAlign: "center", padding: "32px 0" }}>No admin actions recorded</p>
            )}
          </SectionCard>
        </div>
      )}
    </div>
  );
}