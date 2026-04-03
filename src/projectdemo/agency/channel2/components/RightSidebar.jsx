import { roleColors, roleLabels } from "../data/dummyData";

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
  gradGreen:   "linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
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
  blueText:    "#1d4ed8",
  purple:      "#8b5cf6",
  purpleBg:    "#f5f3ff",
  purpleBorder:"#ddd6fe",
  purpleText:  "#6d28d9",
};
const FONT = "'Poppins', sans-serif";

const ROLE_BADGE = {
  platform_admin: { bg: G.redBg,    border: G.redBorder,    text: G.redText,    label: "Admin"    },
  agency_admin:   { bg: G.blueBg,   border: G.blueBorder,   text: G.blueText,   label: "Agency"   },
  developer:      { bg: G.greenBg,  border: G.greenBorder,  text: G.greenDeep,  label: "Dev"      },
  designer:       { bg: G.purpleBg, border: G.purpleBorder, text: G.purpleText, label: "Designer" },
  agency_team:    { bg: G.amberBg,  border: G.amberBorder,  text: G.amberText,  label: "Team"     },
  client:         { bg: G.greenBg,  border: G.greenBorder,  text: G.greenDeep,  label: "Client"   },
};

const MS_DOT   = { completed: G.green,    in_progress: G.blue,    pending: G.muted   };
const MS_COLOR = { completed: G.greenDeep,in_progress: G.blueText,pending: G.muted   };

function Section({ children, last = false }) {
  return (
    <div style={{ padding: "14px 16px", borderBottom: last ? "none" : `1px solid ${G.greenBorder}` }}>
      {children}
    </div>
  );
}

function SLabel({ children }) {
  return (
    <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: G.greenDeep, margin: "0 0 10px", fontFamily: FONT }}>
      {children}
    </p>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, padding: "3px 0", gap: 8 }}>
      <span style={{ color: G.muted, flexShrink: 0 }}>{label}</span>
      <span style={{ fontWeight: 700, color: G.text, textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "60%" }}>{value}</span>
    </div>
  );
}

function ParticipantRow({ participant, isCurrentUser }) {
  const badge = ROLE_BADGE[participant.role] || { bg: G.bg, border: G.border, text: G.muted, label: participant.role };
  const roleDisplay = badge.label;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "nowrap" }}>
      {/* Avatar */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: badge.bg, border: `1.5px solid ${badge.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, fontWeight: 800, color: badge.text,
        }}>
          {participant.avatar || participant.name[0]}
        </div>
        <span style={{
          position: "absolute", bottom: 0, right: 0,
          width: 8, height: 8, borderRadius: "50%",
          border: `1.5px solid ${G.white}`,
          background: participant.online ? G.green : G.muted,
        }} />
      </div>

      {/* Name */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: G.text, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {participant.name}
          {isCurrentUser && <span style={{ color: G.muted, fontWeight: 400, marginLeft: 4 }}>(you)</span>}
        </p>
        <p style={{ fontSize: 10, color: G.muted, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {roleLabels?.[participant.role] || participant.role}
        </p>
      </div>

      {/* Badge */}
      <span style={{
        fontSize: 10, fontWeight: 700, flexShrink: 0,
        background: badge.bg, color: badge.text, border: `1px solid ${badge.border}`,
        padding: "2px 8px", borderRadius: 99,
      }}>{roleDisplay}</span>
    </div>
  );
}

export default function RightSidebar({ participants, project, currentUser }) {
  const adminParticipants  = participants.filter(p => p.role === "platform_admin");
  const agencyParticipants = participants.filter(p => p.role === "agency_admin");
  const teamParticipants   = participants.filter(p => p.role !== "platform_admin" && p.role !== "agency_admin");

  const nextMilestone  = project?.milestones?.find(m => m.status === "in_progress" || m.status === "pending");
  const completedCount = project?.milestones?.filter(m => m.status === "completed").length || 0;

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      height: "100%", fontSize: 13, fontFamily: FONT,
      background: G.white, overflowY: "auto",
      /* responsive: allow sidebar to be full-width on small screens */
      minWidth: 0,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${G.greenBorder}; border-radius: 10px; }
      `}</style>

      {/* Admin monitoring warning */}
      <div style={{ margin: "12px 12px 0", padding: "8px 12px", background: G.redBg, border: `1px solid ${G.redBorder}`, borderRadius: 10, display: "flex", alignItems: "flex-start", gap: 8 }}>
        <svg style={{ width: 14, height: 14, color: G.red, flexShrink: 0, marginTop: 1 }} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
        </svg>
        <p style={{ fontSize: 11, color: G.redText, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>Admin is monitoring this channel</p>
      </div>

      {/* Project Info */}
      <Section>
        <SLabel>Project Info</SLabel>
        <InfoRow label="Project"  value={project?.name}     />
        <InfoRow label="Client"   value={project?.client}   />
        <InfoRow label="Deadline" value={project?.deadline} />
        <div style={{ marginTop: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
            <span style={{ color: G.muted }}>Progress</span>
            <span style={{ fontWeight: 800, color: G.greenDeep }}>{project?.progress}%</span>
          </div>
          <div style={{ height: 6, background: G.border, borderRadius: 99, overflow: "hidden" }}>
            <div style={{ width: `${project?.progress || 0}%`, height: "100%", background: G.green, borderRadius: 99, transition: "width 0.3s" }} />
          </div>
        </div>
      </Section>

      {/* Next Deadline */}
      {nextMilestone && (
        <Section>
          <SLabel>Next Deadline</SLabel>
          <div style={{ background: G.amberBg, border: `1px solid ${G.amberBorder}`, borderRadius: 10, padding: "10px 12px" }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: G.amberText, margin: "0 0 3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{project?.deadline}</p>
            <p style={{ fontSize: 11, color: "#b45309", margin: "0 0 6px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              Milestone {completedCount + 1} — {nextMilestone.title}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <svg style={{ width: 12, height: 12, color: G.amber, flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              <span style={{ fontSize: 11, color: "#b45309", fontWeight: 600 }}>Approaching deadline</span>
            </div>
          </div>
        </Section>
      )}

      {/* Milestones */}
      {project?.milestones?.length > 0 && (
        <Section>
          <SLabel>Milestones ({completedCount}/{project.milestones.length})</SLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {project.milestones.map(m => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: MS_DOT[m.status] || G.muted, flexShrink: 0 }} />
                <span style={{
                  fontSize: 12, flex: 1, color: G.text,
                  textDecoration: m.status === "completed" ? "line-through" : "none",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  opacity: m.status === "completed" ? 0.6 : 1,
                }}>{m.title}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: MS_COLOR[m.status] || G.muted, textTransform: "capitalize", flexShrink: 0, whiteSpace: "nowrap" }}>
                  {m.status.replace("_", " ")}
                </span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Participants */}
      <Section last>
        <SLabel>Participants ({participants.length})</SLabel>

        {adminParticipants.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 10, color: G.muted, marginBottom: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Platform</p>
            {adminParticipants.map(p => <ParticipantRow key={p.id} participant={p} isCurrentUser={p.id === currentUser?.id} />)}
          </div>
        )}

        {agencyParticipants.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 10, color: G.muted, marginBottom: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Agency Admin</p>
            {agencyParticipants.map(p => <ParticipantRow key={p.id} participant={p} isCurrentUser={p.id === currentUser?.id} />)}
          </div>
        )}

        {teamParticipants.length > 0 && (
          <div>
            <p style={{ fontSize: 10, color: G.muted, marginBottom: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Team Members</p>
            {teamParticipants.map(p => <ParticipantRow key={p.id} participant={p} isCurrentUser={p.id === currentUser?.id} />)}
          </div>
        )}
      </Section>
    </div>
  );
}