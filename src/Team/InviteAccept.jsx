import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// ── Mock invite data (replace with real API call) ──────────────────────────
const mockInviteData = {
  agencyName: "NovaByte Studios",
  agencyLogo: null,
  adminName: "Riya Mehta",
  role: "Developer",
  email: "john.doe@example.com",
  expiresAt: "2026-03-20",
  valid: true,
};

const ROLE_ICONS = {
  Developer: "⚙️",
  Designer: "🎨",
  "Project Manager": "📋",
  QA: "🔍",
  Finance: "💼",
  "Agency Admin": "👑",
};

const ROLE_COLORS = {
  Developer: "#3b82f6",
  Designer: "#8b5cf6",
  "Project Manager": "#f59e0b",
  QA: "#10b981",
  Finance: "#06b6d4",
  "Agency Admin": "#ef4444",
};

export default function InviteAccept() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "demo-token";

  const [invite, setInvite] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | valid | expired | invalid | accepted | declined
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Simulate API call to validate token
    const timer = setTimeout(() => {
      if (token) {
        setInvite(mockInviteData);
        setStatus(mockInviteData.valid ? "valid" : "expired");
      } else {
        setStatus("invalid");
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [token]);

  const handleAccept = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStatus("accepted");
      // Navigate to team onboarding after short delay
      setTimeout(() => {
        navigate("/team/onboarding", { state: { token, role: invite.role, agencyName: invite.agencyName, email: invite.email } });
      }, 2000);
    }, 600);
  };

  const handleDecline = () => {
    setIsAnimating(true);
    setTimeout(() => setStatus("declined"), 600);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --green: #4ade80;
          --green-mid: #22c55e;
          --green-dark: #16a34a;
          --blue: #3b82f6;
          --blue-mid: #1d4ed8;
          --blue-dark: #1e3a8a;
          --navy: #0f172a;
          --navy-2: #1e293b;
          --navy-3: #334155;
          --text: #f1f5f9;
          --text-dim: #94a3b8;
          --card-bg: rgba(30, 41, 59, 0.85);
          --border: rgba(148, 163, 184, 0.12);
        }

        .wl-page {
          min-height: 100vh;
          background: var(--navy);
          font-family: 'Sora', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        /* Animated background mesh */
        .wl-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .wl-bg::before {
          content: '';
          position: absolute;
          top: -30%;
          left: -20%;
          width: 70%;
          height: 70%;
          background: radial-gradient(ellipse, rgba(34,197,94,0.12) 0%, transparent 70%);
          animation: drift1 12s ease-in-out infinite alternate;
        }
        .wl-bg::after {
          content: '';
          position: absolute;
          bottom: -20%;
          right: -10%;
          width: 60%;
          height: 60%;
          background: radial-gradient(ellipse, rgba(59,130,246,0.14) 0%, transparent 70%);
          animation: drift2 15s ease-in-out infinite alternate;
        }
        @keyframes drift1 { from { transform: translate(0,0) scale(1); } to { transform: translate(60px, 40px) scale(1.1); } }
        @keyframes drift2 { from { transform: translate(0,0) scale(1); } to { transform: translate(-50px, -30px) scale(1.08); } }

        /* Grid lines */
        .wl-grid {
          position: fixed;
          inset: 0;
          z-index: 0;
          background-image:
            linear-gradient(rgba(148,163,184,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* Card */
        .wl-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 480px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 40px 36px;
          backdrop-filter: blur(20px);
          box-shadow:
            0 0 0 1px rgba(74,222,128,0.08),
            0 24px 80px rgba(0,0,0,0.5),
            0 0 120px rgba(34,197,94,0.05);
          animation: cardIn 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Logo */
        .wl-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 32px;
          justify-content: center;
        }
        .wl-logo-text {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .wl-logo-text span:first-child { color: var(--green-mid); }
        .wl-logo-text span:last-child  { color: #60a5fa; }

        /* Divider */
        .wl-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
          margin: 24px 0;
        }

        /* Agency block */
        .wl-agency-block {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          background: rgba(15,23,42,0.6);
          border: 1px solid var(--border);
          border-radius: 16px;
          margin-bottom: 20px;
        }
        .wl-agency-avatar {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, var(--green-dark), var(--blue-mid));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 800;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(34,197,94,0.25);
        }
        .wl-agency-name {
          font-size: 17px;
          font-weight: 700;
          color: var(--text);
          line-height: 1.2;
        }
        .wl-agency-by {
          font-size: 12px;
          color: var(--text-dim);
          margin-top: 3px;
          font-family: 'DM Sans', sans-serif;
        }

        /* Role badge */
        .wl-role-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          border: 1px solid;
          margin-bottom: 20px;
        }

        /* Info rows */
        .wl-info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid var(--border);
          font-family: 'DM Sans', sans-serif;
        }
        .wl-info-row:last-child { border-bottom: none; }
        .wl-info-label { font-size: 13px; color: var(--text-dim); }
        .wl-info-value { font-size: 13px; color: var(--text); font-weight: 500; }

        /* Headline */
        .wl-headline {
          font-size: 24px;
          font-weight: 800;
          color: var(--text);
          line-height: 1.25;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }
        .wl-headline .highlight {
          background: linear-gradient(90deg, var(--green-mid), #38bdf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .wl-subtext {
          font-size: 13.5px;
          color: var(--text-dim);
          line-height: 1.6;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 24px;
        }

        /* Buttons */
        .wl-btn-row {
          display: flex;
          gap: 12px;
          margin-top: 28px;
        }
        .wl-btn {
          flex: 1;
          padding: 14px 20px;
          border-radius: 14px;
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .wl-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .wl-btn-accept {
          background: linear-gradient(135deg, var(--green-mid) 0%, #22d3ee 100%);
          color: #0f172a;
          box-shadow: 0 4px 20px rgba(34,197,94,0.3);
        }
        .wl-btn-accept:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(34,197,94,0.45);
        }
        .wl-btn-accept:active:not(:disabled) { transform: translateY(0); }

        .wl-btn-decline {
          background: rgba(15,23,42,0.8);
          color: var(--text-dim);
          border: 1px solid var(--border);
        }
        .wl-btn-decline:hover:not(:disabled) {
          background: rgba(239,68,68,0.12);
          border-color: rgba(239,68,68,0.3);
          color: #fca5a5;
        }

        /* States */
        .wl-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
          padding: 8px 0;
        }
        .wl-state-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          animation: popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .wl-state-title { font-size: 22px; font-weight: 800; color: var(--text); }
        .wl-state-sub   { font-size: 14px; color: var(--text-dim); line-height: 1.6; font-family: 'DM Sans', sans-serif; max-width: 320px; }

        /* Loading dots */
        .wl-loading {
          display: flex;
          gap: 8px;
          align-items: center;
          justify-content: center;
          height: 60px;
        }
        .wl-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--green-mid), #38bdf8);
          animation: bounce 1.2s ease-in-out infinite;
        }
        .wl-dot:nth-child(2) { animation-delay: 0.2s; }
        .wl-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%,80%,100% { transform: translateY(0); opacity: 0.4; }
          40%          { transform: translateY(-12px); opacity: 1; }
        }

        /* Security note */
        .wl-note {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 14px 16px;
          background: rgba(34,197,94,0.06);
          border: 1px solid rgba(34,197,94,0.15);
          border-radius: 12px;
          margin-top: 20px;
        }
        .wl-note-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
        .wl-note-text { font-size: 12px; color: var(--text-dim); line-height: 1.6; font-family: 'DM Sans', sans-serif; }
        .wl-note-text strong { color: rgba(74,222,128,0.9); }

        /* Shimmer loading skeleton */
        .wl-skeleton {
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 8px;
        }
        @keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }

        .wl-btn-row-center {
          display: flex;
          justify-content: center;
          margin-top: 24px;
        }
        .wl-btn-home {
          padding: 12px 32px;
          border-radius: 50px;
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          font-weight: 600;
          background: linear-gradient(135deg, var(--green-mid), #38bdf8);
          color: #0f172a;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 20px rgba(34,197,94,0.25);
        }
        .wl-btn-home:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(34,197,94,0.4); }
      `}</style>

      <div className="wl-page">
        <div className="wl-bg" />
        <div className="wl-grid" />

        <div className="wl-card">
          {/* Logo */}
          <div className="wl-logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <ellipse cx="14" cy="14" rx="13" ry="6" stroke="url(#g1)" strokeWidth="2" fill="none" transform="rotate(-30 14 14)" />
              <ellipse cx="14" cy="14" rx="13" ry="6" stroke="url(#g2)" strokeWidth="1.5" fill="none" strokeOpacity="0.5" transform="rotate(30 14 14)" />
              <circle cx="14" cy="14" r="3.5" fill="url(#g3)" />
              <defs>
                <linearGradient id="g1" x1="1" y1="14" x2="27" y2="14"><stop stopColor="#22c55e"/><stop offset="1" stopColor="#38bdf8"/></linearGradient>
                <linearGradient id="g2" x1="1" y1="14" x2="27" y2="14"><stop stopColor="#38bdf8"/><stop offset="1" stopColor="#1d4ed8"/></linearGradient>
                <linearGradient id="g3" x1="10" y1="10" x2="18" y2="18"><stop stopColor="#4ade80"/><stop offset="1" stopColor="#60a5fa"/></linearGradient>
              </defs>
            </svg>
            <div className="wl-logo-text">
              <span>Web</span><span>Lance</span>
            </div>
          </div>

          {/* ── LOADING ── */}
          {status === "loading" && (
            <>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div className="wl-skeleton" style={{ height: 24, width: "60%", margin: "0 auto 10px" }} />
                <div className="wl-skeleton" style={{ height: 14, width: "80%", margin: "0 auto" }} />
              </div>
              <div className="wl-skeleton" style={{ height: 80, marginBottom: 16 }} />
              <div className="wl-skeleton" style={{ height: 44, marginBottom: 12 }} />
              <div className="wl-loading">
                <div className="wl-dot" /><div className="wl-dot" /><div className="wl-dot" />
              </div>
              <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-dim)", fontFamily: "'DM Sans', sans-serif" }}>
                Validating your invitation…
              </p>
            </>
          )}

          {/* ── VALID INVITE ── */}
          {status === "valid" && invite && (
            <>
              <h1 className="wl-headline">
                You've been invited to join <span className="highlight">{invite.agencyName}</span>
              </h1>
              <p className="wl-subtext">
                {invite.adminName} has invited you to collaborate on WebLance as part of their agency team.
              </p>

              {/* Agency block */}
              <div className="wl-agency-block">
                <div className="wl-agency-avatar">
                  {invite.agencyName.charAt(0)}
                </div>
                <div>
                  <div className="wl-agency-name">{invite.agencyName}</div>
                  <div className="wl-agency-by">Invited by {invite.adminName} (Admin)</div>
                </div>
              </div>

              {/* Role badge */}
              <div
                className="wl-role-badge"
                style={{
                  backgroundColor: `${ROLE_COLORS[invite.role] || "#3b82f6"}18`,
                  borderColor: `${ROLE_COLORS[invite.role] || "#3b82f6"}40`,
                  color: ROLE_COLORS[invite.role] || "#3b82f6",
                }}
              >
                <span>{ROLE_ICONS[invite.role] || "👤"}</span>
                <span>Role: {invite.role}</span>
              </div>

              <div className="wl-divider" />

              {/* Info rows */}
              <div>
                <div className="wl-info-row">
                  <span className="wl-info-label">Invite sent to</span>
                  <span className="wl-info-value">{invite.email}</span>
                </div>
                <div className="wl-info-row">
                  <span className="wl-info-label">Invite expires</span>
                  <span className="wl-info-value">{invite.expiresAt}</span>
                </div>
                <div className="wl-info-row">
                  <span className="wl-info-label">Platform</span>
                  <span className="wl-info-value">WebLance</span>
                </div>
              </div>

              {/* Security note */}
              <div className="wl-note">
                <span className="wl-note-icon">🔒</span>
                <p className="wl-note-text">
                  <strong>Secure invitation.</strong> Only accept if you recognize the agency. Your account will be linked to <strong>{invite.agencyName}</strong> and subject to their internal permissions.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="wl-btn-row">
                <button
                  className="wl-btn wl-btn-decline"
                  onClick={handleDecline}
                  disabled={isAnimating}
                >
                  Decline
                </button>
                <button
                  className="wl-btn wl-btn-accept"
                  onClick={handleAccept}
                  disabled={isAnimating}
                >
                  ✓ Accept Invitation
                </button>
              </div>
            </>
          )}

          {/* ── ACCEPTED ── */}
          {status === "accepted" && (
            <div className="wl-state">
              <div className="wl-state-icon" style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)" }}>
                🎉
              </div>
              <div className="wl-state-title">Welcome aboard!</div>
              <p className="wl-state-sub">
                You've successfully joined <strong style={{ color: "var(--text)" }}>{invite?.agencyName}</strong>.<br />
                Setting up your profile now…
              </p>
              <div className="wl-loading">
                <div className="wl-dot" /><div className="wl-dot" /><div className="wl-dot" />
              </div>
              <p style={{ fontSize: 12, color: "var(--text-dim)", fontFamily: "'DM Sans', sans-serif" }}>
                Redirecting to onboarding…
              </p>
            </div>
          )}

          {/* ── DECLINED ── */}
          {status === "declined" && (
            <div className="wl-state">
              <div className="wl-state-icon" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                🚫
              </div>
              <div className="wl-state-title">Invitation Declined</div>
              <p className="wl-state-sub">
                You've declined the invitation from <strong style={{ color: "var(--text)" }}>{invite?.agencyName}</strong>. No action has been taken on your account.
              </p>
              <div className="wl-btn-row-center">
                <button className="wl-btn-home" onClick={() => navigate("/")}>
                  Back to Home
                </button>
              </div>
            </div>
          )}

          {/* ── EXPIRED ── */}
          {status === "expired" && (
            <div className="wl-state">
              <div className="wl-state-icon" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)" }}>
                ⏰
              </div>
              <div className="wl-state-title">Invitation Expired</div>
              <p className="wl-state-sub">
                This invitation link has expired. Please ask the agency admin to send a new invite.
              </p>
              <div className="wl-btn-row-center">
                <button className="wl-btn-home" onClick={() => navigate("/")}>
                  Back to Home
                </button>
              </div>
            </div>
          )}

          {/* ── INVALID ── */}
          {status === "invalid" && (
            <div className="wl-state">
              <div className="wl-state-icon" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                ❌
              </div>
              <div className="wl-state-title">Invalid Link</div>
              <p className="wl-state-sub">
                This invitation link is invalid or has already been used. Contact your agency admin for a new invite.
              </p>
              <div className="wl-btn-row-center">
                <button className="wl-btn-home" onClick={() => navigate("/")}>
                  Back to Home
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}