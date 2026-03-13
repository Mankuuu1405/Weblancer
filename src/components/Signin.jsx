import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/* ─── Brand tokens ─── */
const C = {
  green: "#2ECC8A",
  teal: "#00B4C6",
  navy: "#0D1B2A",
  navy2: "#112236",
  navy3: "#162d45",
  slate: "#1e3a52",
  ink: "#0f172a",
  muted: "rgba(255,255,255,0.45)",
  muted2: "rgba(255,255,255,0.18)",
  border: "rgba(255,255,255,0.09)",
  gborder: "rgba(46,204,138,0.3)",
};

const GRAD = `linear-gradient(135deg, ${C.green}, ${C.teal})`;
const GRAD_SOFT = `linear-gradient(135deg, rgba(46,204,138,0.15), rgba(0,180,198,0.15))`;

/* ─── Reviews ─── */
const REVIEWS = [
  { name: "Rahul K.", role: "Full-stack Dev · India", initials: "RK", text: "Landed my first $3k project within a week. Weblance is genuinely the best platform I've used." },
  { name: "Sara M.", role: "UI/UX Designer · UAE", initials: "SM", text: "I'm fully booked every single month. The quality of clients here is unreal." },
  { name: "James T.", role: "DevOps Engineer · UK", initials: "JT", text: "Got an enterprise contract in 3 days. The escrow system is rock solid." },
  { name: "Priya S.", role: "Content Strategist · India", initials: "PS", text: "I now earn 3x more than my previous job. I recommend Weblance to every freelancer I know." },
  { name: "Carlos R.", role: "Mobile Dev · Brazil", initials: "CR", text: "Only serious clients, zero time-wasters. This is now my primary income source." },
];

/* ─── Canvas: mesh of glowing lines ─── */
const MeshBg = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let id, W, H, t = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 52;
    const nodes = Array.from({ length: N }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.6 + 0.6,
      ph: Math.random() * Math.PI * 2,
      ps: Math.random() * 0.015 + 0.006,
      g: Math.random(),
      hub: false,
    }));
    [2, 11, 23, 35, 47].forEach(i => { nodes[i].hub = true; nodes[i].r = 3.8; });

    const rgb = (g) => {
      const r = Math.round(46 + (0 - 46) * g);
      const gr = Math.round(204 + (180 - 204) * g);
      const b = Math.round(138 + (198 - 138) * g);
      return [r, gr, b];
    };

    const MAXD = 135;

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.003;

      [
        { cx: 0.18, cy: 0.22, rad: 320, g: 0.0, a: 0.13 },
        { cx: 0.78, cy: 0.65, rad: 280, g: 0.6, a: 0.10 },
        { cx: 0.5, cy: 0.85, rad: 240, g: 1.0, a: 0.08 },
      ].forEach((b, i) => {
        const [r, g, bl] = rgb(b.g);
        const pulse = 1 + 0.12 * Math.sin(t * 0.7 + i * 1.8);
        const grd = ctx.createRadialGradient(b.cx * W, b.cy * H, 0, b.cx * W, b.cy * H, b.rad * pulse);
        grd.addColorStop(0, `rgba(${r},${g},${bl},${b.a})`);
        grd.addColorStop(1, `rgba(${r},${g},${bl},0)`);
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(b.cx * W, b.cy * H, b.rad * pulse, 0, Math.PI * 2); ctx.fill();
      });

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.ph += n.ps;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAXD) {
            const falloff = 1 - d / MAXD;
            const hub = nodes[i].hub || nodes[j].hub;
            const mg = (nodes[i].g + nodes[j].g) / 2;
            const [r, g, bl] = rgb(mg);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${r},${g},${bl},${hub ? falloff * 0.65 : falloff * 0.18})`;
            ctx.lineWidth = hub ? 1.1 : 0.55;
            ctx.stroke();
          }
        }
      }

      nodes.forEach(n => {
        const [r, g, bl] = rgb(n.g);
        const glow = 1 + 0.3 * Math.sin(n.ph);
        if (n.hub) {
          const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 7 * glow);
          grd.addColorStop(0, `rgba(${r},${g},${bl},0.5)`);
          grd.addColorStop(1, `rgba(${r},${g},${bl},0)`);
          ctx.fillStyle = grd;
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 7 * glow, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = `rgba(${r},${g},${bl},1)`;
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r * glow, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.fillStyle = `rgba(${r},${g},${bl},${0.35 + 0.18 * Math.sin(n.ph)})`;
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
        }
      });

      const sy = ((t * 28) % (H + 100)) - 50;
      const sg = ctx.createLinearGradient(0, sy - 50, 0, sy + 50);
      sg.addColorStop(0, "rgba(46,204,138,0)");
      sg.addColorStop(0.5, "rgba(46,204,138,0.055)");
      sg.addColorStop(1, "rgba(46,204,138,0)");
      ctx.fillStyle = sg;
      ctx.fillRect(0, sy - 50, W, 100);

      id = requestAnimationFrame(frame);
    };
    frame();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />;
};

/* ─── SVG gradient logo ─── */
const Logo = ({ h = 32 }) => (
  <svg height={h} viewBox="0 0 310 56" fill="none">
    <defs>
      <linearGradient id="lg" x1="0" y1="0" x2="310" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2ECC8A" />
        <stop offset="100%" stopColor="#00B4C6" />
      </linearGradient>
    </defs>
    <text x="2" y="48" fontFamily="'DM Sans',sans-serif" fontWeight="700"
      fontSize="50" letterSpacing="-2" fill="url(#lg)">weblance</text>
  </svg>
);

/* ─── Animated counter ─── */
const useCount = (end, dur = 1800) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    let s = null;
    const step = ts => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / dur, 1);
      setV(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(step); else setV(end);
    };
    requestAnimationFrame(step);
  }, [end, dur]);
  return v;
};

/* ─── Stat pill ─── */
const Stat = ({ end, fmt, label }) => {
  const v = useCount(end);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.04em" }}>{fmt(v)}</div>
      <div style={{ fontSize: 11, color: C.muted, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
    </div>
  );
};

/* ─── Review carousel ─── */
const Reviews = () => {
  const [i, setI] = useState(0);
  const [vis, setV] = useState(true);
  useEffect(() => {
    const iv = setInterval(() => {
      setV(false);
      setTimeout(() => { setI(c => (c + 1) % REVIEWS.length); setV(true); }, 380);
    }, 3400);
    return () => clearInterval(iv);
  }, []);
  const r = REVIEWS[i];
  return (
    <div style={{ position: "relative", border: `1px solid ${C.border}`, borderRadius: 16, padding: "22px 24px", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}>
      <div style={{ position: "absolute", top: 0, left: 24, right: 24, height: 2, background: GRAD, borderRadius: 99 }} />
      <div style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(6px)", transition: "opacity .38s, transform .38s" }}>
        <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
          {[0, 1, 2, 3, 4].map(s => <span key={s} style={{ color: "#F5C842", fontSize: 13 }}>★</span>)}
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.78)", lineHeight: 1.65, marginBottom: 16, fontStyle: "italic" }}>
          "{r.text}"
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{r.initials}</div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "#fff" }}>{r.name}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{r.role}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            {REVIEWS.map((_, k) => (
              <button key={k} onClick={() => { setV(false); setTimeout(() => { setI(k); setV(true); }, 380); }}
                style={{
                  width: k === i ? 20 : 6, height: 6, borderRadius: 99, border: "none", cursor: "pointer", padding: 0,
                  background: k === i ? C.green : "rgba(255,255,255,0.2)", transition: "all .3s"
                }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Icons ─── */
const EyeIcon = ({ on }) => on
  ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
  : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>;

const CheckIcon = () => <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

const GoogleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
  </svg>
);

const GithubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

/* ─── Reusable field message ─── */
const FieldMsg = ({ type, text }) => (
  <p style={{ fontSize: 11.5, color: type === "error" ? "#ef4444" : "#16a34a", marginTop: 5, display: "flex", alignItems: "center", gap: 4 }}>
    {type === "error"
      ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5.5" stroke="#ef4444" /><path d="M6 3.5v3" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" /><circle cx="6" cy="8.5" r=".7" fill="#ef4444" /></svg>
      : <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5.5" stroke="#16a34a" /><path d="M3.5 6l2 2 3-3" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
    }
    {text}
  </p>
);

/* ─── CSS ─── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'DM Sans', sans-serif; }
input, button, select, textarea { font-family: inherit; }

@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
@keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
@keyframes slideIn { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
@keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-5px)} 40%,80%{transform:translateX(5px)} }

.live-dot { animation: blink 2.2s ease-in-out infinite; }
.fade-up  { animation: fadeUp .5s ease both; }
.slide-in { animation: slideIn .4s ease both; }
.shake    { animation: shake .4s ease; }

.inp {
  width:100%; padding:11px 14px; border-radius:10px;
  border:1.5px solid #e2e8f0; font-size:13.5px;
  color:#0f172a; background:#fff; outline:none;
  transition: border-color .18s, box-shadow .18s;
}
.inp:focus { border-color:#00B4C6; box-shadow:0 0 0 3px rgba(0,180,198,.12); }
.inp-err  { border-color:#f87171 !important; box-shadow:0 0 0 3px rgba(248,113,113,.1) !important; }
.inp-ok   { border-color:#2ECC8A !important; box-shadow:0 0 0 3px rgba(46,204,138,.1) !important; }

.social-btn {
  display:flex; align-items:center; justify-content:center; gap:8px;
  border:1.5px solid #e2e8f0; border-radius:10px; padding:10px 0;
  font-size:13px; font-weight:500; color:#374151;
  background:#fff; cursor:pointer; transition:background .15s, border-color .15s, box-shadow .15s;
}
.social-btn:hover { background:#f8fafc; border-color:#cbd5e1; box-shadow:0 1px 4px rgba(0,0,0,.06); }

.cta {
  width:100%; border:none; border-radius:11px; padding:13px 0;
  font-size:14px; font-weight:600; color:#fff; cursor:pointer; letter-spacing:-0.01em;
  background: linear-gradient(135deg, #2ECC8A, #00B4C6);
  box-shadow: 0 4px 20px rgba(0,180,198,.3);
  transition: opacity .15s, transform .12s, box-shadow .15s;
}
.cta:hover  { opacity:.9; box-shadow:0 6px 24px rgba(0,180,198,.38); }
.cta:active { transform:scale(.985); }
.cta:disabled { background:#e2e8f0; color:#94a3b8; box-shadow:none; cursor:not-allowed; }

.tlink { background:none; border:none; cursor:pointer; font-size:inherit; font-weight:600; color:#00B4C6; transition:color .15s; }
.tlink:hover { color:#0099aa; }

.ftag {
  display:inline-flex; align-items:center; gap:6px;
  padding:5px 12px; border-radius:99px; font-size:11.5px; font-weight:500;
  border:1px solid rgba(46,204,138,0.25); color:rgba(255,255,255,0.75);
  background:rgba(46,204,138,0.08);
}
`;

/* ─── Main component ─── */
export default function AuthPage() {
  const navigate = useNavigate();

  /* ── form fields ── */
  const [sp, setSP] = useState(false);
  const [lE, setLE] = useState("");
  const [lP, setLP] = useState("");
  const [lR, setLR] = useState(false);

  /* ── validation state ── */
  const [touched, setTouched] = useState({ email: false, password: false });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shakeKey, setShakeKey] = useState(0); // increment to re-trigger shake

  /* ── validation logic ── */
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lE.trim());
  const passwordValid = lP.length >= 6;
  const canSubmit = emailValid && passwordValid;

  const emailErr = touched.email && !emailValid ? "Please enter a valid email address." : "";
  const passwordErr = touched.password && !passwordValid ? "Password must be at least 6 characters." : "";

  /* ── submit handler ── */
  const handleSubmit = () => {
    setTouched({ email: true, password: true });
    setSubmitted(true);

    if (!canSubmit) {
      setShakeKey(k => k + 1); // re-trigger shake animation
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      DashboardRedirecting();
    }, 1500);
  };
  const [showAlert, setShowAlert] = useState(false);
  /* ── redirect by role ── */
  const DashboardRedirecting = () => {
    const role = localStorage.getItem("role");
    switch (role) {
      case "freelancer": navigate('/dashboard'); break;
      case "hire_talent": navigate('/hire-talent/dashboard'); break;
      case "agency": navigate('/agency/dashboard'); break;
      default:
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 4000);
        break;
    }
  };

  /* ── shared UI pieces ── */
  const divider = (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "14px 0" }}>
      <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
      <span style={{ fontSize: 11.5, color: "#94a3b8", fontWeight: 500 }}>or continue with email</span>
      <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
    </div>
  );

  const socialRow = (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 2 }}>
      {[{ icon: <GoogleIcon />, label: "Google" }, { icon: <GithubIcon />, label: "GitHub" }].map(s => (
        <button key={s.label} className="social-btn">{s.icon}{s.label}</button>
      ))}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{CSS}</style>

      {/* ════════════════════ LEFT ════════════════════ */}
      <div style={{
        width: "48%", minWidth: 0, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column",
        background: C.navy,
      }}>
        <MeshBg />
        {showAlert && <IncompleteStepsAlert onClose={() => setShowAlert(false)} />}

        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "radial-gradient(ellipse 90% 70% at 50% 0%, transparent 40%, rgba(13,27,42,0.7) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", zIndex: 1, background: "linear-gradient(to top, rgba(13,27,42,0.96) 0%, transparent 100%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", height: "100%", padding: "36px 44px" }}>

          <div style={{ alignSelf: "flex-start" }}><Logo h={30} /></div>

          <div style={{ marginTop: 52, marginBottom: 32 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(46,204,138,0.1)", border: "1px solid rgba(46,204,138,0.22)", borderRadius: 99, padding: "5px 13px", marginBottom: 20 }}>
              <span className="live-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, display: "block", flexShrink: 0 }} />
              <span style={{ fontSize: 11.5, fontWeight: 500, color: "rgba(46,204,138,0.9)", letterSpacing: "0.01em" }}>50,000+ professionals active</span>
            </div>

            <h1 style={{ fontSize: 32, fontWeight: 700, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.04em", marginBottom: 14 }}>
              The smarter way<br />
              <span style={{ backgroundImage: GRAD, backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}>
                to work independently.
              </span>
            </h1>
            <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.7, maxWidth: 300 }}>
              Connect with top clients, land real projects, and get paid fast — all without the noise.
            </p>
          </div>

          <div style={{ display: "flex", gap: 0, marginBottom: 28, borderRadius: 14, border: `1px solid ${C.border}`, background: "rgba(255,255,255,0.03)", backdropFilter: "blur(10px)", overflow: "hidden" }}>
            {[
              { end: 50000, fmt: v => `${Math.round(v / 1000)}K+`, label: "Freelancers" },
              { end: 12000, fmt: v => `${Math.round(v / 1000)}K+`, label: "Projects/mo" },
              { end: 2, fmt: v => `$${v}M+`, label: "Paid out" },
            ].map((s, i) => (
              <div key={s.label} style={{ flex: 1, padding: "18px 0", textAlign: "center", borderRight: i < 2 ? `1px solid ${C.border}` : "none" }}>
                <Stat {...s} />
              </div>
            ))}
          </div>

          <Reviews />

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 20 }}>
            {["✦ No hidden fees", "✦ Secure escrow", "✦ 24/7 support", "✦ Verified clients"].map(f => (
              <span key={f} className="ftag">{f}</span>
            ))}
          </div>

          <div style={{ marginTop: "auto", paddingTop: 28, borderTop: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.2)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Trusted by teams at</p>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              {["Notion", "Linear", "Vercel", "Stripe", "Figma"].map(b => (
                <span key={b} style={{ fontSize: 12, color: "rgba(255,255,255,0.22)", fontWeight: 600, letterSpacing: "-0.01em" }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════ RIGHT ════════════════════ */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "48px 32px", background: "#f8fafc", overflowY: "auto",
      }}>

        <div style={{ marginBottom: 28 }}><Logo h={28} /></div>

        <div style={{ width: "100%", maxWidth: 392 }}>

          {/* ── LOGIN ── */}
          <div className="fade-up">
            <div style={{ marginBottom: 22 }}>
              <h2 style={{ fontSize: 21, fontWeight: 700, color: C.ink, letterSpacing: "-0.035em", marginBottom: 4 }}>Welcome back</h2>
              <p style={{ fontSize: 13.5, color: "#64748b" }}>Sign in to your Weblance workspace</p>
            </div>

            {socialRow}{divider}

            {/* ── Global error banner ── */}
            {submitted && !canSubmit && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 10, padding: "11px 14px", marginBottom: 16 }}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ marginTop: 1, flexShrink: 0 }}>
                  <circle cx="7.5" cy="7.5" r="7" stroke="#ef4444" />
                  <path d="M7.5 4.5v4" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="7.5" cy="10.5" r=".9" fill="#ef4444" />
                </svg>
                <span style={{ fontSize: 12.5, color: "#dc2626", lineHeight: 1.55 }}>
                  Please fix the errors below before signing in.
                </span>
              </div>
            )}

            {/* ── Email field ── */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#374151", marginBottom: 5 }}>
                Email address
              </label>
              <input
                className={`inp ${touched.email ? (emailValid ? "inp-ok" : "inp-err") : ""}`}
                type="email"
                value={lE}
                onChange={e => { setLE(e.target.value); setTouched(t => ({ ...t, email: true })); }}
                onBlur={() => setTouched(t => ({ ...t, email: true }))}
                placeholder="you@example.com"
              />
              {emailErr && <FieldMsg type="error" text={emailErr} />}
              {touched.email && emailValid && <FieldMsg type="success" text="Looks good!" />}
            </div>

            {/* ── Password field ── */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: "#374151" }}>Password</label>
                <button className="tlink" style={{ fontSize: 12 }}>Forgot password?</button>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  className={`inp ${touched.password ? (passwordValid ? "inp-ok" : "inp-err") : ""}`}
                  type={sp ? "text" : "password"}
                  value={lP}
                  onChange={e => { setLP(e.target.value); setTouched(t => ({ ...t, password: true })); }}
                  onBlur={() => setTouched(t => ({ ...t, password: true }))}
                  placeholder="••••••••"
                  style={{ paddingRight: 42 }}
                />
                <button
                  onClick={() => setSP(!sp)}
                  style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex" }}
                >
                  <EyeIcon on={sp} />
                </button>
              </div>
              {passwordErr && <FieldMsg type="error" text={passwordErr} />}
              {touched.password && passwordValid && <FieldMsg type="success" text="Password looks good!" />}
            </div>

            {/* ── Remember me ── */}
            <label style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 22, cursor: "pointer" }}>
              <div
                onClick={() => setLR(!lR)}
                style={{
                  width: 17, height: 17, borderRadius: 5, flexShrink: 0, transition: "all .15s", display: "flex", alignItems: "center", justifyContent: "center",
                  border: lR ? "none" : "1.5px solid #cbd5e1", background: lR ? GRAD : "#fff"
                }}
              >
                {lR && <CheckIcon />}
              </div>
              <span style={{ fontSize: 13, color: "#64748b" }}>Keep me signed in</span>
            </label>

            {/* ── Submit button — key forces re-mount to replay shake ── */}
            <button
              key={shakeKey}
              className={`cta ${submitted && !canSubmit ? "shake" : ""}`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign in →"}
            </button>

            <p style={{ textAlign: "center", fontSize: 13, color: "#94a3b8", marginTop: 18 }}>
              No account? <button className="tlink">Create one free</button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 36, display: "flex", gap: 16, alignItems: "center" }}>
          {["Privacy", "Terms", "Help"].map((l, i) => (
            <span key={l}>
              <button className="tlink" style={{ fontSize: 11.5, color: "#94a3b8", fontWeight: 400 }}>{l}</button>
              {i < 2 && <span style={{ color: "#e2e8f0", marginLeft: 16 }}>·</span>}
            </span>
          ))}
        </div>
        <p style={{ fontSize: 11, color: "#cbd5e1", marginTop: 8 }}>© 2025 Weblance, Inc.</p>
      </div>
    </div>
  );
}

export const IncompleteStepsAlert = ({ onClose }) => (
  <div style={{
    position: "fixed", top: 0, left: 0, right: 0,
    background: "#f59e0b", padding: "12px 20px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    zIndex: 9999,
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: 18 }}>⚠</span>
      <span style={{ fontSize: 13.5, fontWeight: 600, color: "#fff" }}>
        You have not completed the necessary steps yet. Do them first, then sign in.
      </span>
    </div>
    <button onClick={onClose} style={{
      background: "none", border: "none", cursor: "pointer",
      color: "#fff", fontSize: 20, lineHeight: 1, padding: 0,
    }}>×</button>
  </div>
);