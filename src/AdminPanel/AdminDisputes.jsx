import { useState } from "react";

/* ── Theme tokens ── */
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
  red:         "#ef4444",
  redBg:       "#fef2f2",
  redBorder:   "#fecaca",
  blue:        "#2563eb",
  blueBg:      "#eff6ff",
  blueBorder:  "#bfdbfe",
};

const FONT = "'Poppins', sans-serif";

/* ── Mock data ── */
const mockDisputes = [
  { id: "DSP-001", project: "E-Commerce Platform Revamp", projectId: "PRJ-003", client: "Vikram Singh", talent: "Rahul Sharma", talentType: "Freelancer", status: "Open", priority: "High", raisedBy: "Client", reason: "Deliverable does not match agreed scope", amountDisputed: 92500, aiVerdict: "Partial fault — Freelancer", aiConfidence: 71, raisedDate: "Mar 10, 2026", lastActivity: "2h ago", evidence: 4, chatSummary: "Client claims backend features were incomplete. Freelancer submitted partial delivery without milestone sign-off. Timeline shows 2 missed deadlines." },
  { id: "DSP-002", project: "Mobile Banking App", projectId: "PRJ-006", client: "Vikram Singh", talent: "TechNova Solutions", talentType: "Agency", status: "Under Review", priority: "High", raisedBy: "Client", reason: "Project abandoned after 50% delivery", amountDisputed: 140000, aiVerdict: "Fault — Agency", aiConfidence: 84, raisedDate: "Mar 8, 2026", lastActivity: "1d ago", evidence: 7, chatSummary: "Agency failed to deliver milestone 3 after 3 deadline extensions. Client funded escrow in full. Admin needs to review agency capacity at time of acceptance." },
  { id: "DSP-003", project: "Patient Appointment App", projectId: "PRJ-002", client: "HealthFirst Clinic", talent: "Arjun Dev", talentType: "Freelancer", status: "Open", priority: "Medium", raisedBy: "Talent", reason: "Client refusing to approve completed milestone", amountDisputed: 80000, aiVerdict: "Partial fault — Client", aiConfidence: 68, raisedDate: "Mar 12, 2026", lastActivity: "5h ago", evidence: 3, chatSummary: "Freelancer submitted milestone 2 on time. Client has been silent for 8 days. AI flagged client for approval delay pattern." },
  { id: "DSP-004", project: "Brand Identity Design", projectId: "PRJ-005", client: "Meera Joshi", talent: "Neha Gupta", talentType: "Freelancer", status: "Resolved", priority: "Low", raisedBy: "Client", reason: "Design not aligned with brief", amountDisputed: 22500, aiVerdict: "Split — 60/40", aiConfidence: 90, raisedDate: "Feb 20, 2026", lastActivity: "10d ago", evidence: 5, chatSummary: "Both parties agreed to partial refund of ₹9,000 after admin mediation. Resolved amicably." },
];

/* ── Sub-components ── */
function Avatar({ name }) {
  const colors = ["#3b82f6","#8b5cf6","#f59e0b","#ef4444","#6EC030","#1A2B5E"];
  const idx = name.charCodeAt(0) % colors.length;
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: 28, height: 28, borderRadius: "50%",
      background: colors[idx] + "22", border: `1.5px solid ${colors[idx]}44`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 10, fontWeight: 700, color: colors[idx], flexShrink: 0,
    }}>{initials}</div>
  );
}

const STAT_COLOR = {
  gray:   { bg: G.bg,       border: G.border,       val: G.text,      label: G.muted    },
  green:  { bg: G.greenBg,  border: G.greenBorder,  val: G.greenDeep, label: G.greenDeep },
  orange: { bg: G.amberBg,  border: G.amberBorder,  val: "#b45309",   label: "#b45309"  },
  red:    { bg: G.redBg,    border: G.redBorder,     val: "#dc2626",   label: "#dc2626"  },
  blue:   { bg: G.blueBg,   border: G.blueBorder,   val: G.blue,      label: G.blue     },
};

function StatCard({ label, value, sub, color = "gray" }) {
  const c = STAT_COLOR[color];
  return (
    <div style={{
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: 14, padding: "16px 20px", flex: 1,
      boxShadow: "0 2px 8px rgba(110,192,48,0.05)",
    }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: c.label, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{label}</p>
      <p style={{ fontSize: 26, fontWeight: 800, color: c.val, margin: 0, lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: G.muted, marginTop: 5 }}>{sub}</p>}
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div style={{
      background: G.white, border: `1px solid ${G.greenBorder}`,
      borderRadius: 16, overflow: "hidden",
      boxShadow: "0 2px 12px rgba(110,192,48,0.06)",
    }}>
      <div style={{ padding: "12px 20px", borderBottom: `1px solid ${G.greenBorder}`, background: G.greenBg }}>
        <p style={{ fontSize: 12, fontWeight: 800, color: G.greenDeep, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>{title}</p>
      </div>
      <div style={{ padding: "20px" }}>{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "9px 0", borderBottom: `1px solid ${G.border}`,
    }}>
      <span style={{ fontSize: 12, color: G.muted, fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: 12, color: G.text, fontWeight: 700, textAlign: "right", maxWidth: "60%" }}>{value}</span>
    </div>
  );
}

/* ── Status badge ── */
const STATUS_MAP = {
  "Open":         { bg: G.redBg,    border: G.redBorder,   text: "#dc2626",   dot: G.red    },
  "Under Review": { bg: G.blueBg,   border: G.blueBorder,  text: G.blue,      dot: G.blue   },
  "Resolved":     { bg: G.greenBg,  border: G.greenBorder, text: G.greenDeep, dot: G.green  },
  "Closed":       { bg: G.bg,       border: G.border,       text: G.muted,     dot: G.muted  },
};

function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP["Closed"];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 11, fontWeight: 700,
      background: s.bg, color: s.text,
      border: `1px solid ${s.border}`,
      padding: "3px 10px", borderRadius: 99,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />
      {status}
    </span>
  );
}

/* ── Priority badge ── */
const PRIORITY_MAP = {
  High:   { bg: G.redBg,   border: G.redBorder,   text: "#dc2626"   },
  Medium: { bg: G.amberBg, border: G.amberBorder, text: "#92400e"   },
  Low:    { bg: G.greenBg, border: G.greenBorder, text: G.greenDeep },
};

function PriorityBadge({ priority }) {
  const s = PRIORITY_MAP[priority] || PRIORITY_MAP.Low;
  return (
    <span style={{
      fontSize: 10, fontWeight: 700,
      background: s.bg, color: s.text,
      border: `1px solid ${s.border}`,
      padding: "2px 9px", borderRadius: 99,
    }}>{priority}</span>
  );
}

/* ── Confidence bar ── */
function ConfidenceBar({ pct }) {
  const color = pct >= 80 ? G.green : pct >= 60 ? G.amber : G.red;
  const textColor = pct >= 80 ? G.greenDeep : pct >= 60 ? "#b45309" : "#dc2626";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
      <div style={{ width: 44, height: 5, background: G.border, borderRadius: 99, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99 }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color: textColor }}>{pct}%</span>
    </div>
  );
}

const HEADERS = ["Dispute ID","Project","Client","Talent","Status","Priority","Raised By","Amount","AI Verdict","Confidence","Evidence","Last Activity","Actions"];

const btnNavy = {
  display: "inline-flex", alignItems: "center", gap: 6,
  fontSize: 12, fontWeight: 700, fontFamily: FONT,
  background: G.gradNavy, color: G.white,
  border: "none", borderRadius: 100, padding: "8px 16px",
  cursor: "pointer", boxShadow: "0 3px 12px rgba(15,26,59,0.25)",
  whiteSpace: "nowrap",
};

export default function AdminDisputes() {
  const [search,          setSearch]          = useState("");
  const [statusFilter,    setStatusFilter]    = useState("");
  const [priorityFilter,  setPriorityFilter]  = useState("");
  const [selected,        setSelected]        = useState(null);
  const [hovRow,          setHovRow]          = useState(null);
  const [decisionNote,    setDecisionNote]    = useState("");
  const [chosenAction,    setChosenAction]    = useState("");

  const filtered = mockDisputes.filter(d => {
    const q = search.toLowerCase();
    return (
      (d.project.toLowerCase().includes(q) || d.client.toLowerCase().includes(q) ||
       d.talent.toLowerCase().includes(q)  || d.id.toLowerCase().includes(q)) &&
      (!statusFilter   || d.status   === statusFilter) &&
      (!priorityFilter || d.priority === priorityFilter)
    );
  });

  const stats = {
    total:    mockDisputes.length,
    open:     mockDisputes.filter(d => d.status === "Open").length,
    review:   mockDisputes.filter(d => d.status === "Under Review").length,
    amount:   mockDisputes.filter(d => d.status !== "Resolved").reduce((s, d) => s + d.amountDisputed, 0),
  };

  const selectStyle = (active) => ({
    fontSize: 12, fontWeight: 600, fontFamily: FONT,
    border: `1.5px solid ${active ? G.green : G.greenBorder}`,
    borderRadius: 100, padding: "8px 14px",
    background: active ? G.greenBg : G.white,
    color: active ? G.greenDeep : G.sub,
    cursor: "pointer", outline: "none",
  });

  /* Decision options */
  const getDecisions = (d) => d ? [
    { key: "client",  label: `Rule in favor of Client — Full refund (₹${(d.amountDisputed/1000).toFixed(0)}k)`, activeBg: G.redBg,    activeBorder: G.red,        activeText: "#dc2626"   },
    { key: "talent",  label: "Rule in favor of Talent — Full release to talent",                                  activeBg: G.greenBg,  activeBorder: G.green,      activeText: G.greenDeep },
    { key: "split",   label: `Split — Follow AI verdict (${d.aiVerdict})`,                                       activeBg: G.blueBg,   activeBorder: G.blue,       activeText: G.blue      },
    { key: "escalate",label: "Escalate — Request more evidence",                                                  activeBg: G.amberBg,  activeBorder: G.amber,      activeText: "#92400e"   },
    { key: "close",   label: "Close dispute — No action",                                                         activeBg: G.bg,       activeBorder: G.border,     activeText: G.sub       },
  ] : [];

  return (
    <div style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }
        input, select, textarea { outline: none; font-family: 'Poppins', sans-serif; }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.4px" }}>Disputes</h1>
          <p style={{ fontSize: 13, color: G.muted, marginTop: 3 }}>AI investigates, admin decides — every dispute tracked</p>
        </div>
        <button style={btnNavy}>⬇ Export</button>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
        <StatCard label="Total Disputes"   value={stats.total}                                       color="gray"   />
        <StatCard label="Open"             value={stats.open}   sub="Needs action"                   color="red"    />
        <StatCard label="Under Review"     value={stats.review}                                       color="blue"   />
        <StatCard label="Amount Disputed"  value={`₹${(stats.amount / 1000).toFixed(0)}k`}           color="orange" />
      </div>

      {/* Table card */}
      <div style={{
        background: G.white, border: `1px solid ${G.greenBorder}`,
        borderRadius: 16, overflow: "hidden",
        boxShadow: "0 2px 12px rgba(110,192,48,0.06)",
      }}>

        {/* Filter bar */}
        <div style={{
          padding: "14px 20px", borderBottom: `1px solid ${G.greenBorder}`,
          display: "flex", flexWrap: "wrap", gap: 10,
          alignItems: "center", justifyContent: "space-between",
          background: G.greenBg,
        }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", flex: 1 }}>
            <div style={{ position: "relative", flex: "1 1 200px", maxWidth: 280 }}>
              <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: G.muted }}>🔍</span>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search dispute, project, user…"
                style={{
                  width: "100%", fontSize: 12, fontWeight: 500,
                  border: `1.5px solid ${G.greenBorder}`, borderRadius: 100,
                  padding: "8px 12px 8px 32px", background: G.white,
                  color: G.text, boxSizing: "border-box",
                }}
              />
            </div>
            {[
              { value: statusFilter,   setter: setStatusFilter,   label: "All Status",   opts: ["Open","Under Review","Resolved","Closed"] },
              { value: priorityFilter, setter: setPriorityFilter, label: "All Priority", opts: ["High","Medium","Low"]                     },
            ].map(({ value, setter, label, opts }) => (
              <select key={label} value={value} onChange={e => setter(e.target.value)} style={selectStyle(!!value)}>
                <option value="">{label}</option>
                {opts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            ))}
          </div>
          <span style={{ fontSize: 11, color: G.muted, fontWeight: 600 }}>{filtered.length} results</span>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1200 }}>
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
              {filtered.map(d => (
                <tr
                  key={d.id}
                  style={{
                    borderBottom: `1px solid ${G.border}`,
                    background: hovRow === d.id ? G.greenBg : G.white,
                    cursor: "pointer", transition: "background 0.1s",
                  }}
                  onMouseEnter={() => setHovRow(d.id)}
                  onMouseLeave={() => setHovRow(null)}
                  onClick={() => { setSelected(d); setChosenAction(""); setDecisionNote(""); }}
                >
                  {/* Dispute ID */}
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: G.navy, fontFamily: "monospace" }}>{d.id}</span>
                  </td>
                  {/* Project */}
                  <td style={{ padding: "12px 14px" }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: G.text, margin: 0, maxWidth: 140, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.project}</p>
                  </td>
                  {/* Client */}
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <Avatar name={d.client} />
                      <span style={{ fontSize: 12, color: G.sub }}>{d.client}</span>
                    </div>
                  </td>
                  {/* Talent */}
                  <td style={{ padding: "12px 14px" }}>
                    <p style={{ fontSize: 12, color: G.text, fontWeight: 600, margin: 0 }}>{d.talent}</p>
                    <p style={{ fontSize: 10, color: G.muted, margin: 0 }}>{d.talentType}</p>
                  </td>
                  {/* Status */}
                  <td style={{ padding: "12px 14px" }}><StatusBadge status={d.status} /></td>
                  {/* Priority */}
                  <td style={{ padding: "12px 14px" }}><PriorityBadge priority={d.priority} /></td>
                  {/* Raised by */}
                  <td style={{ padding: "12px 14px", fontSize: 12, color: G.sub }}>{d.raisedBy}</td>
                  {/* Amount */}
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#b45309" }}>₹{(d.amountDisputed/1000).toFixed(0)}k</span>
                  </td>
                  {/* AI Verdict */}
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{ fontSize: 11, color: G.sub, maxWidth: 120, display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.aiVerdict}</span>
                  </td>
                  {/* Confidence */}
                  <td style={{ padding: "12px 14px" }}><ConfidenceBar pct={d.aiConfidence} /></td>
                  {/* Evidence */}
                  <td style={{ padding: "12px 14px", textAlign: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: G.sub }}>{d.evidence} files</span>
                  </td>
                  {/* Last activity */}
                  <td style={{ padding: "12px 14px", fontSize: 12, color: G.muted, whiteSpace: "nowrap" }}>{d.lastActivity}</td>
                  {/* Actions */}
                  <td style={{ padding: "12px 14px" }} onClick={e => e.stopPropagation()}>
                    <div style={{ opacity: hovRow === d.id ? 1 : 0, transition: "opacity 0.15s" }}>
                      <button
                        onClick={e => { e.stopPropagation(); setSelected(d); setChosenAction(""); setDecisionNote(""); }}
                        style={{
                          fontSize: 11, fontWeight: 700, fontFamily: FONT,
                          background: G.gradNavy, color: G.white,
                          border: "none", borderRadius: 100, padding: "6px 12px",
                          cursor: "pointer", boxShadow: "0 2px 8px rgba(15,26,59,0.22)",
                        }}>Review</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "56px 20px", textAlign: "center" }}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              background: G.greenBg, border: `1px solid ${G.greenBorder}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, marginBottom: 12,
            }}>◎</div>
            <p style={{ fontSize: 14, fontWeight: 700, color: G.text }}>No disputes found</p>
            <p style={{ fontSize: 12, color: G.muted, marginTop: 4 }}>Try adjusting the search or filter criteria</p>
          </div>
        )}

        <div style={{ padding: "12px 20px", borderTop: `1px solid ${G.greenBorder}`, background: G.greenBg }}>
          <span style={{ fontSize: 11, color: G.muted, fontWeight: 600 }}>
            Showing {filtered.length} of {mockDisputes.length} disputes
          </span>
        </div>
      </div>

      {/* ── Dispute Detail Drawer ── */}
      {selected && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", justifyContent: "flex-end" }} onClick={() => setSelected(null)}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(15,26,59,0.18)" }} />
          <div
            style={{
              position: "relative", width: "100%", maxWidth: 520,
              background: G.white, height: "100%", overflowY: "auto",
              boxShadow: "-8px 0 40px rgba(15,26,59,0.15)",
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Sticky header */}
            <div style={{
              padding: "16px 20px", borderBottom: `1px solid ${G.greenBorder}`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              position: "sticky", top: 0, background: G.white, zIndex: 10,
              boxShadow: "0 2px 8px rgba(110,192,48,0.07)",
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: G.text, fontFamily: "monospace" }}>{selected.id}</span>
                  <StatusBadge status={selected.status} />
                  <PriorityBadge priority={selected.priority} />
                </div>
                <p style={{ fontSize: 12, color: G.muted, margin: 0 }}>{selected.project}</p>
              </div>
              <button onClick={() => setSelected(null)} style={{
                background: G.bg, border: `1px solid ${G.border}`,
                borderRadius: "50%", width: 30, height: 30,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, color: G.muted, cursor: "pointer", fontFamily: FONT, flexShrink: 0,
              }}>✕</button>
            </div>

            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>

              {/* AI Analysis Banner */}
              <div style={{
                padding: 16, borderRadius: 14,
                background: G.blueBg, border: `1px solid ${G.blueBorder}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: G.blue }}>◎ AI Analysis</span>
                    <span style={{ fontSize: 11, color: G.blue, opacity: 0.7 }}>Confidence: {selected.aiConfidence}%</span>
                  </div>
                  <ConfidenceBar pct={selected.aiConfidence} />
                </div>
                <p style={{ fontSize: 13, color: G.navy, lineHeight: 1.7, margin: "0 0 12px" }}>{selected.chatSummary}</p>
                <div style={{
                  padding: "10px 14px", background: G.white,
                  borderRadius: 10, border: `1px solid ${G.blueBorder}`,
                }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px" }}>AI Verdict</p>
                  <p style={{ fontSize: 13, fontWeight: 800, color: G.text, margin: 0 }}>{selected.aiVerdict}</p>
                </div>
              </div>

              {/* Parties */}
              <SectionCard title="Parties Involved">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{
                    padding: 12, background: G.greenBg,
                    borderRadius: 10, border: `1px solid ${G.greenBorder}`,
                  }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 8px" }}>Client</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Avatar name={selected.client} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: G.text }}>{selected.client}</span>
                    </div>
                  </div>
                  <div style={{
                    padding: 12, background: G.blueBg,
                    borderRadius: 10, border: `1px solid ${G.blueBorder}`,
                  }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 8px" }}>{selected.talentType}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Avatar name={selected.talent} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: G.text }}>{selected.talent}</span>
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* Dispute Details */}
              <SectionCard title="Dispute Details">
                <InfoRow label="Dispute ID"      value={selected.id}               />
                <InfoRow label="Raised By"       value={selected.raisedBy}         />
                <InfoRow label="Reason"          value={selected.reason}           />
                <InfoRow label="Amount Disputed" value={`₹${selected.amountDisputed.toLocaleString()}`} />
                <InfoRow label="Raised On"       value={selected.raisedDate}       />
                <InfoRow label="Evidence Files"  value={`${selected.evidence} files submitted`} />
              </SectionCard>

              {/* Admin Decision */}
              <SectionCard title="Admin Decision">
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                  {getDecisions(selected).map(a => (
                    <button key={a.key} onClick={() => setChosenAction(chosenAction === a.key ? "" : a.key)}
                      style={{
                        width: "100%", textAlign: "left",
                        padding: "10px 14px", borderRadius: 10,
                        border: `1.5px solid ${chosenAction === a.key ? a.activeBorder : G.border}`,
                        background: chosenAction === a.key ? a.activeBg : G.white,
                        cursor: "pointer", transition: "all 0.12s", fontFamily: FONT,
                        fontSize: 12, fontWeight: chosenAction === a.key ? 700 : 500,
                        color: chosenAction === a.key ? a.activeText : G.sub,
                      }}>
                      {a.label}
                    </button>
                  ))}
                </div>

                <textarea
                  value={decisionNote}
                  onChange={e => setDecisionNote(e.target.value)}
                  placeholder="Add decision note (will be sent to both parties)..."
                  rows={3}
                  style={{
                    width: "100%", fontSize: 12, fontFamily: FONT,
                    border: `1.5px solid ${G.greenBorder}`, borderRadius: 10,
                    padding: "10px 14px", background: G.white, color: G.text,
                    resize: "none", boxSizing: "border-box", marginBottom: 12,
                  }}
                />

                <button style={{
                  width: "100%", padding: "12px 0",
                  fontSize: 13, fontWeight: 800, fontFamily: FONT,
                  borderRadius: 10, border: "none", cursor: "pointer",
                  background: chosenAction ? G.gradNavy : G.border,
                  color: chosenAction ? G.white : G.muted,
                  boxShadow: chosenAction ? "0 3px 12px rgba(15,26,59,0.2)" : "none",
                  transition: "all 0.15s",
                }}>
                  Confirm Decision
                </button>
              </SectionCard>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}