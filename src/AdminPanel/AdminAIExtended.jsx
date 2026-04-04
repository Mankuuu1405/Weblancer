import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
};
const FONT = "'Poppins', sans-serif";

/* ═══════════════════════════════════════════════
   SHARED MINI-COMPONENTS
═══════════════════════════════════════════════ */
function StatCard({ label, value, sub, color = "gray" }) {
  const map = {
    gray:   { bg: G.bg,      border: G.border,      val: G.text,     lbl: G.muted     },
    green:  { bg: G.greenBg, border: G.greenBorder, val: G.greenDeep,lbl: G.greenDeep },
    orange: { bg: G.amberBg, border: G.amberBorder, val: "#b45309",  lbl: "#b45309"   },
    red:    { bg: G.redBg,   border: G.redBorder,   val: G.redText,  lbl: G.redText   },
    blue:   { bg: G.navyBg,  border: G.navyBorder,  val: G.navy,     lbl: G.navy      },
  };
  const c = map[color] || map.gray;
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 14, padding: "16px 20px", flex: 1, minWidth: 0, boxShadow: "0 2px 8px rgba(110,192,48,0.05)" }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: c.lbl, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{label}</p>
      <p style={{ fontSize: 26, fontWeight: 800, color: c.val, margin: 0, lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: G.muted, marginTop: 5 }}>{sub}</p>}
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

/* ── Mock data ── */
const mockAILogs = [
  { id:"AIL-001", action:"Auto-suspended account",        target:"Priya Menon (FL-004)",   confidence:92, outcome:"Executed",       timestamp:"Mar 14, 2026 · 11:42 AM", category:"User",    reason:"Dispute rate 32% — crossed 30% threshold"          },
  { id:"AIL-002", action:"Auto-flagged suspicious signup", target:"FakeUser999 (CL-005)",   confidence:97, outcome:"Executed",       timestamp:"Mar 14, 2026 · 09:15 AM", category:"User",    reason:"Duplicate device + disposable email detected"       },
  { id:"AIL-004", action:"Dispute pre-analysis",          target:"DSP-001 — E-Commerce",   confidence:71, outcome:"Notified Admin", timestamp:"Mar 10, 2026 · 09:30 AM", category:"Dispute", reason:"Confidence 71% — below threshold"                  },
  { id:"AIL-006", action:"Auto-approved milestone",       target:"PRJ-004 — MS 5",         confidence:95, outcome:"Executed",       timestamp:"Feb 28, 2026 · 08:00 AM", category:"Project", reason:"Client silent 7 days auto-approval"                 },
  { id:"AIL-012", action:"Fraud pattern detected",        target:"FakeUser999 (CL-005)",   confidence:98, outcome:"Executed",       timestamp:"Feb 28, 2026 · 09:00 AM", category:"User",    reason:"3 failed KYC attempts"                              },
];

const mockOverrides = [
  {
    id: "OVR-001",
    target: "Karan Malhotra (FL-003)",
    aiVerdict: "Suspend — high risk profile",
    adminDecision: "Reduced visibility only",
    adminBy: "Platform Admin",
    date: "Mar 12, 2026",
    confidence: 78,
    category: "User Behavior",
    impact: "High",
    reason: "Admin disagreed with the severity. The high-risk signals were triggered by a single dispute event rather than a sustained pattern of policy violations.",
  },
  {
    id: "OVR-002",
    target: "DSP-004 — Brand Identity",
    aiVerdict: "Full refund to client (95%)",
    adminDecision: "Partial refund (60% to client)",
    adminBy: "Super Admin",
    date: "Mar 5, 2026",
    confidence: 90,
    category: "Dispute",
    impact: "Medium",
    reason: "The project brief was genuinely vague. While the talent failed delivery, the client did not provide sufficient documentation, justifying a shared loss.",
  },
];

/* ═══════════════════════════════════════════════
   PAGE 1 — AI LOGS
═══════════════════════════════════════════════ */
export function AdminAILogs() {
  const navigate = useNavigate();
  const [search,         setSearch]   = useState("");
  const [categoryFilter, setCategory] = useState("");
  const [outcomeFilter,  setOutcome]  = useState("");
  const [expanded,       setExpanded] = useState(null);

  const filtered = mockAILogs.filter(l => {
    const q = search.toLowerCase();
    return (
      (l.action.toLowerCase().includes(q) || l.target.toLowerCase().includes(q)) &&
      (!categoryFilter || l.category === categoryFilter) &&
      (!outcomeFilter  || l.outcome  === outcomeFilter)
    );
  });

  const outcomeStyle = (out) => {
    if (out === "Executed")       return { bg: G.greenBg,  text: G.greenDeep, border: G.greenBorder };
    if (out === "Notified Admin") return { bg: G.amberBg,  text: G.amberText, border: G.amberBorder };
    return                               { bg: G.bg,       text: G.muted,     border: G.border      };
  };

  const selectStyle = (active) => ({
    fontSize: 12, fontWeight: 600, fontFamily: FONT,
    border: `1.5px solid ${active ? G.green : G.greenBorder}`,
    borderRadius: 100, padding: "8px 14px",
    background: active ? G.greenBg : G.white,
    color: active ? G.greenDeep : G.sub,
    cursor: "pointer", outline: "none",
  });

  return (
    <div style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;} input,select{outline:none;font-family:'Poppins',sans-serif;}`}</style>

      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.4px" }}>AI Decisions Log</h1>
          <p style={{ fontSize: 13, color: G.muted, marginTop: 3 }}>Immutable ledger of every autonomous platform action</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={btnOutline} onClick={() => navigate("/admin/ai-overrides")}>Admin Overrides →</button>
          <button style={btnNavy}>⬇ Export Logs</button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
        <StatCard label="Total AI Actions" value={mockAILogs.length} color="gray"   />
        <StatCard label="Auto-Executed"    value="84%"  sub="No intervention"   color="green"  />
        <StatCard label="Avg Confidence"   value="91.2%"                         color="blue"   />
        <StatCard label="Manual Overrides" value="3"    sub="Retraining queued" color="orange" />
      </div>

      {/* ── Policy banner ── */}
      <div style={{
        background: G.navyBg, border: `1px solid ${G.navyBorder}`,
        borderRadius: 14, padding: "16px 20px", marginBottom: 24,
        display: "flex", alignItems: "center", gap: 16,
        boxShadow: "0 2px 8px rgba(26,43,94,0.06)",
      }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: G.gradNavy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>◎</div>
        <p style={{ fontSize: 12, color: G.navy, margin: 0, flex: 1, lineHeight: 1.6 }}>
          <b>Policy:</b> Confidence <b>≥ 90%</b> triggers auto-execution. <b>65–89%</b> notifies specialized admin. Below <b>65%</b> is ignored and logged for model drift analysis.
        </p>
        <button style={{ ...btnOutline, background: G.white }}>Edit Thresholds</button>
      </div>

      {/* ── Table card ── */}
      <div style={{ background: G.white, border: `1px solid ${G.greenBorder}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(110,192,48,0.06)" }}>

        {/* Filter bar */}
        <div style={{ padding: "14px 20px", background: G.greenBg, borderBottom: `1px solid ${G.greenBorder}`, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: "1 1 200px", maxWidth: 300 }}>
            <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: G.muted }}>🔍</span>
            <input
              placeholder="Search logs…" value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", fontSize: 12, fontWeight: 500, border: `1.5px solid ${G.greenBorder}`, borderRadius: 100, padding: "8px 12px 8px 32px", background: G.white, color: G.text, boxSizing: "border-box" }}
            />
          </div>

          {/* Category filter — wired */}
          <select value={categoryFilter} onChange={e => setCategory(e.target.value)} style={selectStyle(!!categoryFilter)}>
            <option value="">All Categories</option>
            {["User","Dispute","Project"].map(o => <option key={o} value={o}>{o}</option>)}
          </select>

          {/* Outcome filter — wired */}
          <select value={outcomeFilter} onChange={e => setOutcome(e.target.value)} style={selectStyle(!!outcomeFilter)}>
            <option value="">All Outcomes</option>
            {["Executed","Notified Admin"].map(o => <option key={o} value={o}>{o}</option>)}
          </select>

          <span style={{ fontSize: 11, color: G.muted, fontWeight: 600, marginLeft: "auto" }}>{filtered.length} results</span>
        </div>

        {/* Log rows */}
        <div>
          {filtered.map(log => {
            const s     = outcomeStyle(log.outcome);
            const isExp = expanded === log.id;
            return (
              <div key={log.id} style={{ borderBottom: `1px solid ${G.border}` }}>
                <div
                  onClick={() => setExpanded(isExp ? null : log.id)}
                  style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", background: isExp ? G.greenBg : G.white, transition: "background 0.12s" }}
                  onMouseEnter={e => { if (!isExp) e.currentTarget.style.background = G.bg; }}
                  onMouseLeave={e => { if (!isExp) e.currentTarget.style.background = G.white; }}
                >
                  {/* Confidence dot */}
                  <div style={{ width: 9, height: 9, borderRadius: "50%", background: log.confidence >= 90 ? G.green : G.amber, flexShrink: 0 }} />

                  {/* Action + target */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: G.text }}>{log.action}</span>
                      <span style={{ fontSize: 10, fontWeight: 800, padding: "2px 9px", borderRadius: 99, background: s.bg, color: s.text, border: `1px solid ${s.border}` }}>
                        {log.outcome.toUpperCase()}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 99, background: G.navyBg, color: G.navy, border: `1px solid ${G.navyBorder}` }}>
                        {log.category}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: G.muted }}>Target: {log.target}</span>
                  </div>

                  {/* Confidence bar */}
                  <div style={{ textAlign: "right", marginRight: 16, flexShrink: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: G.navy, marginBottom: 5 }}>{log.confidence}%</div>
                    <div style={{ width: 64, height: 5, background: G.border, borderRadius: 99, overflow: "hidden" }}>
                      <div style={{ width: `${log.confidence}%`, height: "100%", background: log.confidence >= 90 ? G.green : G.amber, borderRadius: 99 }} />
                    </div>
                  </div>

                  {/* Timestamp + ID */}
                  <div style={{ fontSize: 11, color: G.muted, textAlign: "right", flexShrink: 0, minWidth: 110 }}>
                    {log.timestamp}
                    <div style={{ fontSize: 10, fontWeight: 700, color: G.navyLight, marginTop: 2 }}>{log.id}</div>
                  </div>

                  {/* Expand chevron */}
                  <span style={{ fontSize: 10, color: G.muted, transform: isExp ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>▶</span>
                </div>

                {/* Expanded detail */}
                {isExp && (
                  <div style={{ padding: "0 20px 18px 46px" }}>
                    <div style={{ background: G.bg, border: `1px solid ${G.border}`, borderRadius: 12, padding: "14px 16px" }}>
                      <p style={{ margin: "0 0 8px", fontSize: 12, color: G.sub }}><b>Reasoning:</b> {log.reason}</p>
                      <p style={{ margin: "0 0 12px", fontSize: 11, color: G.muted }}>Category: {log.category} · Retraining Status: Queued</p>
                      <button style={btnOutline}>Override Decision</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty */}
        {filtered.length === 0 && (
          <div style={{ padding: "56px 20px", textAlign: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: G.greenBg, border: `1px solid ${G.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, margin: "0 auto 12px" }}>◎</div>
            <p style={{ fontSize: 14, fontWeight: 700, color: G.text }}>No logs match your filters</p>
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: "12px 20px", background: G.greenBg, borderTop: `1px solid ${G.greenBorder}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: G.muted, fontWeight: 600 }}>Showing {filtered.length} of {mockAILogs.length} logs</span>
          <div style={{ display: "flex", gap: 6 }}>
            {["← Prev","Next →"].map(label => (
              <button key={label} style={{ fontSize: 12, fontWeight: 600, fontFamily: FONT, padding: "7px 14px", border: `1px solid ${G.greenBorder}`, borderRadius: 100, background: G.white, color: G.greenDeep, cursor: "pointer" }}
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
   PAGE 2 — ADMIN OVERRIDES
═══════════════════════════════════════════════ */
export function AdminAIOverrides() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [hovCard,  setHovCard]  = useState(null);

  return (
    <div style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;} input,select,textarea{outline:none;font-family:'Poppins',sans-serif;}`}</style>

      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
        <div>
          <button onClick={() => navigate("/admin/ai-logs")}
            style={{ border: "none", background: "none", color: G.navyLight, cursor: "pointer", fontSize: 13, fontWeight: 600, padding: 0, marginBottom: 10, display: "flex", alignItems: "center", gap: 5 }}
            onMouseEnter={e => e.currentTarget.style.color = G.navy}
            onMouseLeave={e => e.currentTarget.style.color = G.navyLight}
          >← Back to AI Logs</button>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.4px" }}>Admin Overrides</h1>
          <p style={{ fontSize: 13, color: G.muted, marginTop: 3 }}>Human intelligence refining platform automation</p>
        </div>
        <button style={btnNavy}>+ Create Manual Override</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24, alignItems: "start" }}>

        {/* ── Left: Override cards ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {mockOverrides.map(ovr => {
            const isActive = selected?.id === ovr.id;
            const isHov    = hovCard === ovr.id;
            return (
              <div
                key={ovr.id}
                onClick={() => setSelected(ovr)}
                onMouseEnter={() => setHovCard(ovr.id)}
                onMouseLeave={() => setHovCard(null)}
                style={{
                  background: G.white,
                  border: `1.5px solid ${isActive ? G.green : isHov ? G.greenBorder : G.border}`,
                  borderRadius: 16,
                  padding: "20px 22px",
                  cursor: "pointer",
                  boxShadow: isActive ? "0 6px 24px rgba(110,192,48,0.13)" : isHov ? "0 4px 16px rgba(110,192,48,0.07)" : "0 2px 8px rgba(110,192,48,0.04)",
                  transform: isActive ? "translateY(-2px)" : "none",
                  transition: "border-color 0.15s, box-shadow 0.15s, transform 0.15s",
                }}
              >
                {/* Top meta row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: G.navy,     background: G.navyBg,  padding: "3px 10px", borderRadius: 99, border: `1px solid ${G.navyBorder}`  }}>{ovr.id}</span>
                    <span style={{ fontSize: 10, fontWeight: 800, color: G.amberText,background: G.amberBg, padding: "3px 10px", borderRadius: 99, border: `1px solid ${G.amberBorder}` }}>{ovr.impact} IMPACT</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: G.muted }}>{ovr.date}</span>
                </div>

                <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: G.text }}>{ovr.target}</h3>

                {/* AI vs Admin verdict boxes */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {/* AI verdict */}
                  <div style={{ background: G.navyBg, padding: "14px", borderRadius: 12, border: `1px solid ${G.navyBorder}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
                      <span style={{ fontSize: 12 }}>◎</span>
                      <p style={{ margin: 0, fontSize: 10, fontWeight: 800, color: G.navyLight, textTransform: "uppercase", letterSpacing: "0.06em" }}>AI Verdict</p>
                    </div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: G.navy }}>{ovr.aiVerdict}</p>
                    <p style={{ margin: "4px 0 0", fontSize: 11, color: G.navyLight }}>Confidence: {ovr.confidence}%</p>
                  </div>

                  {/* Admin decision */}
                  <div style={{ background: G.greenBg, padding: "14px", borderRadius: 12, border: `1px solid ${G.greenBorder}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
                      <span style={{ fontSize: 12 }}>👤</span>
                      <p style={{ margin: 0, fontSize: 10, fontWeight: 800, color: G.greenDeep, textTransform: "uppercase", letterSpacing: "0.06em" }}>Admin Decision</p>
                    </div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: G.greenDeep }}>{ovr.adminDecision}</p>
                    <p style={{ margin: "4px 0 0", fontSize: 11, color: G.greenDeep, opacity: 0.7 }}>By {ovr.adminBy}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Right: Detail panel ── */}
        <div style={{
          background: G.white,
          border: `1px solid ${G.greenBorder}`,
          borderRadius: 20,
          padding: 28,
          position: "sticky",
          top: 28,
          boxShadow: "0 4px 24px rgba(110,192,48,0.08)",
        }}>
          {selected ? (
            <>
              {/* Panel header */}
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: G.greenBg, border: `1px solid ${G.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 12px" }}>🧠</div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: G.navy, margin: "0 0 4px" }}>Logic Analysis</h2>
                <p style={{ fontSize: 12, color: G.muted }}>Correction submitted by {selected.adminBy}</p>
              </div>

              {/* Justification */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 10, fontWeight: 800, color: G.muted, display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.07em" }}>Override Justification</label>
                <div style={{ background: G.bg, padding: "16px", borderRadius: 14, fontSize: 13, lineHeight: 1.65, color: G.text, border: `1px solid ${G.border}`, fontStyle: "italic" }}>
                  "{selected.reason}"
                </div>
              </div>

              {/* Retraining banner */}
              <div style={{ background: G.gradNavy, padding: "18px 20px", borderRadius: 14, marginBottom: 20, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", right: -10, bottom: -10, fontSize: 56, opacity: 0.08, pointerEvents: "none" }}>⚙️</div>
                <label style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.07em" }}>Model Retraining Status</label>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: G.white }}>Queued for Batch #42</p>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: "rgba(255,255,255,0.45)" }}>Priority: {selected.impact === "High" ? "Immediate" : "Standard"}</p>
                  </div>
                  <span style={{ padding: "4px 12px", borderRadius: 8, background: "rgba(255,255,255,0.1)", fontSize: 11, fontWeight: 700, color: G.greenLight, border: "1px solid rgba(255,255,255,0.15)" }}>PENDING</span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button style={{ ...btnNavy, width: "100%", justifyContent: "center" }}>Download Technical Audit</button>
                <button style={{ ...btnOutline, width: "100%", justifyContent: "center" }}>View Original AI Log</button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: G.greenBg, border: `1px solid ${G.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 20px" }}>🔍</div>
              <p style={{ fontSize: 15, fontWeight: 700, color: G.navy, margin: "0 0 8px" }}>No Selection</p>
              <p style={{ fontSize: 13, color: G.muted, lineHeight: 1.6 }}>Select an override case from the list to analyze the human-in-the-loop logic.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}