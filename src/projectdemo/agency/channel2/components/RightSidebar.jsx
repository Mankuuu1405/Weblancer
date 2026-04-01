// ── RightSidebar.jsx ───────────────────────────────────
import { roleColors, roleLabels } from "../data/dummyData";

const G = {
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",
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
};
const FONT = "'Poppins', sans-serif";

/* ── Section wrapper ── */
function Section({ children, last = false }) {
  return (
    <div style={{ padding: "14px 16px", borderBottom: last ? "none" : `1px solid ${G.greenBorder}` }}>
      {children}
    </div>
  );
}

/* ── Section label ── */
function SLabel({ children }) {
  return (
    <p style={{
      fontSize: 10, fontWeight: 800, textTransform: "uppercase",
      letterSpacing: "0.08em", color: G.greenDeep,
      margin: "0 0 10px", fontFamily: FONT,
    }}>{children}</p>
  );
}

/* ── Key-value row ── */
function InfoRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "3px 0" }}>
      <span style={{ color: G.muted }}>{label}</span>
      <span style={{ fontWeight: 700, color: G.text }}>{value}</span>
    </div>
  );
}

export default function RightSidebar({ participants, project, currentUser }) {
  const agencyParticipants = participants.filter(p => p.role === "agency_admin");
  const teamParticipants   = participants.filter(p => p.role !== "platform_admin" && p.role !== "agency_admin");
  const adminParticipants  = participants.filter(p => p.role === "platform_admin");

  const nextMilestone  = project.milestones.find(m => m.status === "in_progress" || m.status === "pending");
  const completedCount = project.milestones.filter(m => m.status === "completed").length;

  const MS_DOT = {
    completed:   G.green,
    in_progress: G.blue,
    pending:     G.muted,
  };
  const MS_TEXT_COLOR = {
    completed:   G.muted,
    in_progress: G.text,
    pending:     G.text,
  };
  const MS_STATUS_COLOR = {
    completed:   G.greenDeep,
    in_progress: G.blue,
    pending:     G.muted,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", fontSize: 13, fontFamily: FONT, background: G.white }}>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;}`}</style>

      {/* Admin monitoring warning */}
      <div style={{ margin: "12px 12px 0", padding: "8px 12px", background: G.redBg, border: `1px solid ${G.redBorder}`, borderRadius: 10, display: "flex", alignItems: "flex-start", gap: 8 }}>
        <svg style={{ width: 14, height: 14, color: G.red, flexShrink: 0, marginTop: 1 }} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <p style={{ fontSize: 11, color: "#dc2626", fontWeight: 600, margin: 0, lineHeight: 1.4 }}>Admin is monitoring this channel</p>
      </div>

      {/* Project Info */}
      <Section>
        <SLabel>Project Info</SLabel>
        <InfoRow label="Project"  value={project.name}     />
        <InfoRow label="Client"   value={project.client}   />
        <InfoRow label="Deadline" value={project.deadline} />
        <div style={{ marginTop: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
            <span style={{ color: G.muted }}>Progress</span>
            <span style={{ fontWeight: 800, color: G.greenDeep }}>{project.progress}%</span>
          </div>
          <div style={{ height: 6, background: G.border, borderRadius: 99, overflow: "hidden" }}>
            <div style={{ width: `${project.progress}%`, height: "100%", background: G.green, borderRadius: 99 }} />
          </div>
        </div>
      </Section>

      {/* Next Deadline */}
      {nextMilestone && (
        <Section>
          <SLabel>Next Deadline</SLabel>
          <div style={{ background: G.amberBg, border: `1px solid ${G.amberBorder}`, borderRadius: 10, padding: "10px 12px" }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#92400e", margin: "0 0 3px" }}>{project.deadline}</p>
            <p style={{ fontSize: 11, color: "#b45309", margin: "0 0 6px" }}>
              Milestone {completedCount + 1} — {nextMilestone.title}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <svg style={{ width: 12, height: 12, color: G.amber }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span style={{ fontSize: 11, color: "#b45309", fontWeight: 600 }}>Approaching deadline</span>
            </div>
          </div>
        </Section>
      )}

      {/* Milestones */}
      <Section>
        <SLabel>Milestones ({completedCount}/{project.milestones.length})</SLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {project.milestones.map(m => (
            <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: MS_DOT[m.status] || G.muted, flexShrink: 0 }} />
              <span style={{
                fontSize: 12, flex: 1,
                color: MS_TEXT_COLOR[m.status] || G.text,
                textDecoration: m.status === "completed" ? "line-through" : "none",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{m.title}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: MS_STATUS_COLOR[m.status] || G.muted, textTransform: "capitalize" }}>
                {m.status.replace("_", " ")}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Participants */}
      <Section last>
        <SLabel>Participants ({participants.length})</SLabel>

        {adminParticipants.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 10, color: G.muted, marginBottom: 8, fontWeight: 600 }}>Platform</p>
            {adminParticipants.map(p => (
              <ParticipantRow key={p.id} participant={p} isCurrentUser={p.id === currentUser.id} />
            ))}
          </div>
        )}

        {agencyParticipants.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 10, color: G.muted, marginBottom: 8, fontWeight: 600 }}>Agency Admin</p>
            {agencyParticipants.map(p => (
              <ParticipantRow key={p.id} participant={p} isCurrentUser={p.id === currentUser.id} />
            ))}
          </div>
        )}

        {teamParticipants.length > 0 && (
          <div>
            <p style={{ fontSize: 10, color: G.muted, marginBottom: 8, fontWeight: 600 }}>Team Members</p>
            {teamParticipants.map(p => (
              <ParticipantRow key={p.id} participant={p} isCurrentUser={p.id === currentUser.id} />
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

/* ── Participant row ── */
const ROLE_BADGE = {
  platform_admin: { bg: "#fef2f2", border: "#fecaca", text: "#dc2626" },
  agency_admin:   { bg: "#eff6ff", border: "#bfdbfe", text: "#2563eb" },
  developer:      { bg: "#f1fce8", border: "#d4edbb", text: "#2E7D1F" },
  designer:       { bg: "#f5f3ff", border: "#ddd6fe", text: "#7c3aed" },
  client:         { bg: "#f1fce8", border: "#d4edbb", text: "#2E7D1F" },
};

function ParticipantRow({ participant, isCurrentUser }) {
  const colors = roleColors[participant.role] || roleColors["developer"];
  const badge  = ROLE_BADGE[participant.role] || { bg: "#f9fafb", border: "#e5e7eb", text: "#4b5563" };

  const roleDisplay =
    participant.role === "platform_admin" ? "Admin"  :
    participant.role === "agency_admin"   ? "Agency" :
    participant.role.charAt(0).toUpperCase() + participant.role.slice(1);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
      {/* Avatar */}
      <div style={{
        position: "relative", width: 28, height: 28, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 700, flexShrink: 0,
        background: colors.avatar?.split(" ")[0] || "#f1fce8",
      }}>
        {participant.avatar}
        <span style={{
          position: "absolute", bottom: 0, right: 0,
          width: 8, height: 8, borderRadius: "50%",
          border: "1.5px solid #fff",
          background: participant.online ? "#6EC030" : "#9ca3af",
        }} />
      </div>

      {/* Name + role label */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: "#1C1C1C", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {participant.name}
          {isCurrentUser && <span style={{ color: "#9ca3af", fontWeight: 400, marginLeft: 4 }}>(you)</span>}
        </p>
        <p style={{ fontSize: 10, color: "#9ca3af", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {roleLabels[participant.role] || participant.role}
        </p>
      </div>

      {/* Role badge */}
      <span style={{
        fontSize: 10, fontWeight: 700, flexShrink: 0,
        background: badge.bg, color: badge.text,
        border: `1px solid ${badge.border}`,
        padding: "2px 8px", borderRadius: 99,
      }}>{roleDisplay}</span>
    </div>
  );
}