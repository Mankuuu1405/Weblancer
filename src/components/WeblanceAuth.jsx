import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ─── Brand tokens ─── */
const GRAD      = "linear-gradient(135deg, #2ECC8A, #00B4C6)";
const GRAD_TEXT = { backgroundImage: GRAD, backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" };

/* ─── Reviews ─── */
const REVIEWS = [
  { name:"Rahul K.",  role:"Full-stack Dev · India",     initials:"RK", text:"Landed my first $3k project within a week. Weblance is genuinely the best platform I've used." },
  { name:"Sara M.",   role:"UI/UX Designer · UAE",       initials:"SM", text:"I'm fully booked every single month. The quality of clients here is unreal." },
  { name:"James T.",  role:"DevOps Engineer · UK",       initials:"JT", text:"Got an enterprise contract in 3 days. The escrow system is rock solid." },
  { name:"Priya S.",  role:"Content Strategist · India", initials:"PS", text:"I now earn 3x more than my previous job. I recommend Weblance to every freelancer I know." },
  { name:"Carlos R.", role:"Mobile Dev · Brazil",        initials:"CR", text:"Only serious clients, zero time-wasters. This is now my primary income source." },
];

/* ─── Canvas: animated mesh background ─── */
const MeshBg = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let id, W, H, t = 0;

    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const N = 52;
    const nodes = Array.from({ length: N }, (_, i) => ({
      x: Math.random() * (W || 600), y: Math.random() * (H || 800),
      vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.6 + 0.6, ph: Math.random() * Math.PI * 2,
      ps: Math.random() * 0.015 + 0.006, g: Math.random(), hub: false,
    }));
    [2,11,23,35,47].forEach(i => { nodes[i].hub = true; nodes[i].r = 3.8; });

    const rgb = g => [
      Math.round(46  + (0   - 46 ) * g),
      Math.round(204 + (180 - 204) * g),
      Math.round(138 + (198 - 138) * g),
    ];

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.003;

      [
        { cx:0.18, cy:0.22, rad:320, g:0.0, a:0.13 },
        { cx:0.78, cy:0.65, rad:280, g:0.6, a:0.10 },
        { cx:0.5,  cy:0.85, rad:240, g:1.0, a:0.08 },
      ].forEach((b, i) => {
        const [r,g,bl] = rgb(b.g);
        const pulse = 1 + 0.12 * Math.sin(t * 0.7 + i * 1.8);
        const grd = ctx.createRadialGradient(b.cx*W, b.cy*H, 0, b.cx*W, b.cy*H, b.rad*pulse);
        grd.addColorStop(0, `rgba(${r},${g},${bl},${b.a})`);
        grd.addColorStop(1, `rgba(${r},${g},${bl},0)`);
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(b.cx*W, b.cy*H, b.rad*pulse, 0, Math.PI*2); ctx.fill();
      });

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.ph += n.ps;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      for (let i = 0; i < N; i++) {
        for (let j = i+1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx*dx+dy*dy);
          if (d < 135) {
            const falloff = 1 - d/135;
            const hub = nodes[i].hub || nodes[j].hub;
            const [r,g,bl] = rgb((nodes[i].g + nodes[j].g) / 2);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${r},${g},${bl},${hub ? falloff*0.65 : falloff*0.18})`;
            ctx.lineWidth = hub ? 1.1 : 0.55; ctx.stroke();
          }
        }
      }

      nodes.forEach(n => {
        const [r,g,bl] = rgb(n.g);
        const glow = 1 + 0.3 * Math.sin(n.ph);
        if (n.hub) {
          const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r*7*glow);
          grd.addColorStop(0, `rgba(${r},${g},${bl},0.5)`); grd.addColorStop(1, `rgba(${r},${g},${bl},0)`);
          ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(n.x, n.y, n.r*7*glow, 0, Math.PI*2); ctx.fill();
          ctx.fillStyle = `rgba(${r},${g},${bl},1)`; ctx.beginPath(); ctx.arc(n.x, n.y, n.r*glow, 0, Math.PI*2); ctx.fill();
        } else {
          ctx.fillStyle = `rgba(${r},${g},${bl},${0.35 + 0.18*Math.sin(n.ph)})`;
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI*2); ctx.fill();
        }
      });

      const sy = ((t * 28) % (H + 100)) - 50;
      const sg = ctx.createLinearGradient(0, sy-50, 0, sy+50);
      sg.addColorStop(0, "rgba(46,204,138,0)"); sg.addColorStop(0.5, "rgba(46,204,138,0.055)"); sg.addColorStop(1, "rgba(46,204,138,0)");
      ctx.fillStyle = sg; ctx.fillRect(0, sy-50, W, 100);

      id = requestAnimationFrame(frame);
    };
    frame();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />;
};

/* ─── Logo ─── */
const Logo = ({ h = 32 }) => (
  <img src="/image-removebg-preview.png" alt="Weblance" style={{ height: h, width: "auto", display: "block" }} />
);

/* ─── Animated counter ─── */
const useCount = (end, dur = 1800) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    let s = null;
    const step = ts => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / dur, 1);
      setV(Math.floor((1 - Math.pow(1-p,3)) * end));
      if (p < 1) requestAnimationFrame(step); else setV(end);
    };
    requestAnimationFrame(step);
  }, [end, dur]);
  return v;
};

const Stat = ({ end, fmt, label }) => {
  const v = useCount(end);
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="text-[22px] font-bold text-white tracking-tight">{fmt(v)}</div>
      <div className="text-[11px] text-white/45 font-medium tracking-widest uppercase">{label}</div>
    </div>
  );
};

/* ─── Review Carousel ─── */
const Reviews = () => {
  const [i, setI] = useState(0);
  const [vis, setV] = useState(true);
  useEffect(() => {
    const iv = setInterval(() => {
      setV(false);
      setTimeout(() => { setI(c => (c+1) % REVIEWS.length); setV(true); }, 380);
    }, 3400);
    return () => clearInterval(iv);
  }, []);
  const r = REVIEWS[i];
  return (
    <div className="relative border border-white/[0.09] rounded-2xl p-[22px_24px] bg-white/[0.04] backdrop-blur-xl">
      <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full" style={{ background: GRAD }} />
      <div style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(6px)", transition: "opacity .38s, transform .38s" }}>
        <div className="flex gap-0.5 mb-2.5">
          {[0,1,2,3,4].map(s => <span key={s} className="text-[#F5C842] text-[13px]">★</span>)}
        </div>
        <p className="text-[13px] text-white/[0.78] leading-[1.65] mb-4 italic">"{r.text}"</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0" style={{ background: GRAD }}>
              {r.initials}
            </div>
            <div>
              <div className="text-[12.5px] font-semibold text-white">{r.name}</div>
              <div className="text-[11px] text-white/45">{r.role}</div>
            </div>
          </div>
          <div className="flex gap-1.5">
            {REVIEWS.map((_,k) => (
              <button key={k}
                onClick={() => { setV(false); setTimeout(() => { setI(k); setV(true); }, 380); }}
                className="h-1.5 rounded-full border-none cursor-pointer p-0 transition-all duration-300"
                style={{ width: k === i ? 20 : 6, background: k === i ? "#2ECC8A" : "rgba(255,255,255,0.2)" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Icons ─── */
const EyeIcon = ({ on }) => on
  ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
    <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

/* ══════════════════════════════
   MAIN AUTH PAGE
══════════════════════════════ */
export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("freelancer");
  const [sp,   setSP]   = useState(false);
  const [sc,   setSC]   = useState(false);
  const [lE,   setLE]   = useState("");
  const [lP,   setLP]   = useState("");
  const [lR,   setLR]   = useState(false);
  const [sN,   setSN]   = useState("");
  const [sE,   setSE]   = useState("");
  const [sPw,  setSPw]  = useState("");
  const [sCP,  setSCP]  = useState("");
  const [sAg,  setSAg]  = useState(false);

  const pwOk = sPw && sCP && sPw === sCP;
  const rules = [
    { t: "8+ chars",  ok: sPw.length >= 8 },
    { t: "Uppercase", ok: /[A-Z]/.test(sPw) },
    { t: "Number",    ok: /[0-9]/.test(sPw) },
  ];

  /* shared divider */
  const Divider = () => (
    <div className="flex items-center gap-2.5 my-3.5">
      <div className="flex-1 h-px bg-slate-200" />
      <span className="text-[11.5px] text-slate-400 font-medium">or continue with email</span>
      <div className="flex-1 h-px bg-slate-200" />
    </div>
  );

  /* social buttons */
  const SocialRow = () => (
    <div className="grid grid-cols-2 gap-2 mb-0.5">
      {[{ icon: <GoogleIcon />, label: "Google" }, { icon: <GithubIcon />, label: "GitHub" }].map(s => (
        <button key={s.label}
          className="flex items-center justify-center gap-2 border border-slate-200 rounded-[10px] py-2.5 text-[13px] font-medium text-gray-700 bg-white cursor-pointer transition-all hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm"
        >
          {s.icon}{s.label}
        </button>
      ))}
    </div>
  );

  /* reusable label */
  const Label = ({ children }) => (
    <label className="block text-[12.5px] font-semibold text-gray-700 mb-[5px]">{children}</label>
  );

  /* reusable input */
  const inputBase = "w-full px-3.5 py-[11px] rounded-[10px] border border-slate-200 text-[13.5px] text-slate-900 bg-white outline-none transition-all focus:border-[#00B4C6] focus:shadow-[0_0_0_3px_rgba(0,180,198,0.12)]";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'DM Sans', sans-serif; }

        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }

        .live-dot  { animation: blink 2.2s ease-in-out infinite; }
        .fade-up   { animation: fadeUp .5s ease both; }
        .slide-in  { animation: slideIn .4s ease both; }

        .inp-ok-border  { border-color: #2ECC8A !important; box-shadow: 0 0 0 3px rgba(46,204,138,.12) !important; }
        .inp-err-border { border-color: #f87171 !important; box-shadow: 0 0 0 3px rgba(248,113,113,.12) !important; }

        /* Green scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #2ECC8A; border-radius: 8px; }
        ::-webkit-scrollbar-thumb:hover { background: #0D1B2A; }
        * { scrollbar-width: thin; scrollbar-color: #2ECC8A #f1f5f9; }
      `}</style>

      <div className="min-h-screen flex font-[DM_Sans,sans-serif]">

        {/* ══════════ LEFT PANEL ══════════ */}
        <div className="w-[48%] min-w-0 relative overflow-hidden flex flex-col bg-[#0D1B2A] hidden md:flex">
          <MeshBg />

          {/* Vignette overlays */}
          <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 0%, transparent 40%, rgba(13,27,42,0.7) 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 z-[1] pointer-events-none" style={{ background: "linear-gradient(to top, rgba(13,27,42,0.96) 0%, transparent 100%)" }} />

          {/* Content */}
          <div className="relative z-[2] flex flex-col h-full p-9 lg:p-11">

            {/* Logo */}
            <div className="self-start"><Logo h={30} /></div>

            {/* Hero text */}
            <div className="mt-12 mb-8">
              <div className="inline-flex items-center gap-[7px] bg-[rgba(46,204,138,0.1)] border border-[rgba(46,204,138,0.22)] rounded-full px-[13px] py-[5px] mb-5">
                <span className="live-dot w-1.5 h-1.5 rounded-full bg-[#2ECC8A] block flex-shrink-0" />
                <span className="text-[11.5px] font-medium text-[rgba(46,204,138,0.9)] tracking-[0.01em]">50,000+ professionals active</span>
              </div>
              <h1 className="text-[32px] font-bold text-white leading-[1.2] tracking-[-0.04em] mb-3.5">
                The smarter way<br/>
                <span style={GRAD_TEXT}>to work independently.</span>
              </h1>
              <p className="text-[13.5px] text-white/45 leading-[1.7] max-w-[300px]">
                Connect with top clients, land real projects, and get paid fast — all without the noise.
              </p>
            </div>

            {/* Stats row */}
            <div className="flex mb-7 rounded-2xl border border-white/[0.09] bg-white/[0.03] backdrop-blur-[10px] overflow-hidden">
              {[
                { end:50000, fmt: v => `${Math.round(v/1000)}K+`, label: "Freelancers"  },
                { end:12000, fmt: v => `${Math.round(v/1000)}K+`, label: "Projects/mo"  },
                { end:2,     fmt: v => `$${v}M+`,                  label: "Paid out"     },
              ].map((s, i) => (
                <div key={s.label} className={`flex-1 py-[18px] text-center ${i < 2 ? "border-r border-white/[0.09]" : ""}`}>
                  <Stat {...s} />
                </div>
              ))}
            </div>

            {/* Review carousel */}
            <Reviews />

            {/* Feature tags */}
            <div className="flex gap-2 flex-wrap mt-5">
              {["✦ No hidden fees","✦ Secure escrow","✦ 24/7 support","✦ Verified clients"].map(f => (
                <span key={f} className="inline-flex items-center gap-1.5 px-3 py-[5px] rounded-full text-[11.5px] font-medium text-white/75 border border-[rgba(46,204,138,0.25)] bg-[rgba(46,204,138,0.08)]">
                  {f}
                </span>
              ))}
            </div>

            {/* Footer brand row */}
            <div className="mt-auto pt-7 border-t border-white/[0.09]">
              <p className="text-[10.5px] text-white/20 font-medium tracking-[0.08em] uppercase mb-2.5">Trusted by teams at</p>
              <div className="flex gap-5 items-center">
                {["Notion","Linear","Vercel","Stripe","Figma"].map(b => (
                  <span key={b} className="text-[12px] text-white/[0.22] font-semibold tracking-[-0.01em]">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════ RIGHT PANEL ══════════ */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 bg-slate-50 overflow-y-auto">

          {/* Logo (mobile / right panel) */}
          <div className="mb-7"><Logo h={28} /></div>

          <div className="w-full max-w-[392px]">

            {/* Tab switcher */}
            <div className="flex bg-slate-100 rounded-[11px] p-[3px] mb-7 gap-0.5">
              {[{ id:"login", label:"Sign in" }, { id:"signup", label:"Create account" }].map(t => (
                <button key={t.id} onClick={() => setMode(t.id)}
                  className={`flex-1 py-[9px] rounded-lg text-[13px] font-semibold border-none cursor-pointer transition-all duration-200
                    ${mode === t.id ? "bg-white text-slate-900 shadow-sm" : "bg-transparent text-slate-400"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* ── LOGIN ── */}
            {mode === "login" && (
              <div className="fade-up">
                <div className="mb-[22px]">
                  <h2 className="text-[21px] font-bold text-slate-900 tracking-[-0.035em] mb-1">Welcome back</h2>
                  <p className="text-[13.5px] text-slate-500">Sign in to your Weblance workspace</p>
                </div>

                <SocialRow />
                <Divider />

                {/* Email */}
                <div className="mb-3">
                  <Label>Email address</Label>
                  <input className={inputBase} type="email" value={lE} onChange={e => setLE(e.target.value)} placeholder="you@example.com" />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <div className="flex justify-between mb-[5px]">
                    <Label>Password</Label>
                    <button className="text-[12px] font-semibold text-[#00B4C6] bg-none border-none cursor-pointer hover:text-[#0099aa] transition-colors">Forgot password?</button>
                  </div>
                  <div className="relative">
                    <input className={inputBase} type={sp ? "text" : "password"} value={lP} onChange={e => setLP(e.target.value)} placeholder="••••••••" style={{ paddingRight: 42 }} />
                    <button onClick={() => setSP(!sp)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-slate-400 flex">
                      <EyeIcon on={sp} />
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <label className="flex items-center gap-[9px] mb-[22px] cursor-pointer">
                  <div onClick={() => setLR(!lR)}
                    className="w-[17px] h-[17px] rounded-[5px] flex-shrink-0 flex items-center justify-center transition-all duration-150"
                    style={{ border: lR ? "none" : "1.5px solid #cbd5e1", background: lR ? GRAD : "#fff" }}
                  >
                    {lR && <CheckIcon />}
                  </div>
                  <span className="text-[13px] text-slate-500">Keep me signed in</span>
                </label>

                {/* CTA */}
                <button
                  onClick={() => navigate("/")}
                  className="w-full border-none rounded-[11px] py-[13px] text-[14px] font-semibold text-white cursor-pointer tracking-[-0.01em] transition-all hover:opacity-90 active:scale-[0.985]"
                  style={{ background: GRAD, boxShadow: "0 4px 20px rgba(0,180,198,.3)" }}
                >
                  Sign in →
                </button>

                <p className="text-center text-[13px] text-slate-400 mt-[18px]">
                  No account?{" "}
                  <button className="font-semibold text-[#00B4C6] bg-transparent border-none cursor-pointer hover:text-[#0099aa] transition-colors" onClick={() => setMode("signup")}>
                    Create one free
                  </button>
                </p>
              </div>
            )}

            {/* ── SIGNUP ── */}
            {mode === "signup" && (
              <div className="fade-up">
                <div className="mb-5">
                  <h2 className="text-[21px] font-bold text-slate-900 tracking-[-0.035em] mb-1">Create your account</h2>
                  <p className="text-[13.5px] text-slate-500">Join 50,000+ freelancers and clients</p>
                </div>

                {/* Role selector */}
                <div className="flex gap-[9px] mb-[18px]">
                  {[
                    { id:"freelancer", icon:"💼", label:"Freelancer", sub:"I want to find work"   },
                    { id:"client",     icon:"🏢", label:"Client",     sub:"I want to hire talent" },
                  ].map(r => (
                    <button key={r.id} onClick={() => setRole(r.id)}
                      className={`flex-1 p-[13px_14px] rounded-[11px] cursor-pointer text-left transition-all duration-200 border
                        ${role === r.id
                          ? "border-[#2ECC8A] bg-gradient-to-br from-[rgba(46,204,138,0.06)] to-[rgba(0,180,198,0.06)]"
                          : "border-slate-200 bg-white hover:border-[#00B4C6] hover:bg-[#f0fdfe]"}`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[18px]">{r.icon}</span>
                        <div className="w-[15px] h-[15px] rounded-full bg-white flex-shrink-0 transition-all duration-200"
                          style={{ border: role === r.id ? `5px solid #2ECC8A` : "2px solid #cbd5e1" }}
                        />
                      </div>
                      <div className={`text-[13px] font-semibold mb-0.5 ${role === r.id ? "text-slate-900" : "text-gray-700"}`}>{r.label}</div>
                      <div className="text-[11.5px] text-slate-400">{r.sub}</div>
                    </button>
                  ))}
                </div>

                <SocialRow />
                <Divider />

                {/* Full name */}
                <div className="mb-[11px]">
                  <Label>Full name</Label>
                  <input className={inputBase} type="text" value={sN} onChange={e => setSN(e.target.value)} placeholder="Alex Johnson" />
                </div>

                {/* Email */}
                <div className="mb-[11px]">
                  <Label>Email address</Label>
                  <input className={inputBase} type="email" value={sE} onChange={e => setSE(e.target.value)} placeholder="you@example.com" />
                </div>

                {/* Password */}
                <div className="mb-1.5">
                  <Label>Password</Label>
                  <div className="relative">
                    <input className={inputBase} type={sp ? "text" : "password"} value={sPw} onChange={e => setSPw(e.target.value)} placeholder="Create a strong password" style={{ paddingRight: 42 }} />
                    <button onClick={() => setSP(!sp)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-slate-400 flex">
                      <EyeIcon on={sp} />
                    </button>
                  </div>
                </div>

                {/* Password rules */}
                {sPw && (
                  <div className="flex gap-2.5 flex-wrap mb-[11px]">
                    {rules.map(r => (
                      <span key={r.t} className="flex items-center gap-[5px] text-[11.5px] font-medium transition-colors duration-200" style={{ color: r.ok ? "#0f172a" : "#94a3b8" }}>
                        <span className="w-[13px] h-[13px] rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200"
                          style={{ background: r.ok ? GRAD : "#e2e8f0" }}>
                          {r.ok && <CheckIcon />}
                        </span>
                        {r.t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Confirm password */}
                <div className="mb-3.5">
                  <Label>Confirm password</Label>
                  <div className="relative">
                    <input
                      className={`${inputBase} ${sCP ? (pwOk ? "inp-ok-border" : "inp-err-border") : ""}`}
                      type={sc ? "text" : "password"}
                      value={sCP} onChange={e => setSCP(e.target.value)}
                      placeholder="Repeat password"
                      style={{ paddingRight: 64, borderColor: sCP ? (pwOk ? "#2ECC8A" : "#f87171") : "#e2e8f0" }}
                    />
                    <button onClick={() => setSC(!sc)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-slate-400 flex">
                      <EyeIcon on={sc} />
                    </button>
                    {sCP && (
                      <span className="absolute right-10 top-1/2 -translate-y-1/2 text-[14px] font-bold" style={{ color: pwOk ? "#2ECC8A" : "#f87171" }}>
                        {pwOk ? "✓" : "✗"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Agree checkbox */}
                <label className="flex items-start gap-[9px] mb-[18px] cursor-pointer">
                  <div onClick={() => setSAg(!sAg)}
                    className="w-[17px] h-[17px] min-w-[17px] rounded-[5px] flex-shrink-0 mt-[1px] flex items-center justify-center transition-all duration-150"
                    style={{ border: sAg ? "none" : "1.5px solid #cbd5e1", background: sAg ? GRAD : "#fff" }}
                  >
                    {sAg && <CheckIcon />}
                  </div>
                  <span className="text-[12.5px] text-slate-500 leading-[1.55]">
                    I agree to the{" "}
                    <button className="text-[12.5px] font-semibold text-[#00B4C6] bg-transparent border-none cursor-pointer hover:text-[#0099aa] transition-colors">Terms of Service</button>
                    {" "}and{" "}
                    <button className="text-[12.5px] font-semibold text-[#00B4C6] bg-transparent border-none cursor-pointer hover:text-[#0099aa] transition-colors">Privacy Policy</button>
                  </span>
                </label>

                {/* CTA */}
                <button
                  disabled={!sAg}
                  className="w-full border-none rounded-[11px] py-[13px] text-[14px] font-semibold text-white cursor-pointer tracking-[-0.01em] transition-all hover:opacity-90 active:scale-[0.985] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed"
                  style={sAg ? { background: GRAD, boxShadow: "0 4px 20px rgba(0,180,198,.3)" } : {}}
                >
                  Create free account →
                </button>

                <p className="text-center text-[13px] text-slate-400 mt-[18px]">
                  Already have an account?{" "}
                  <button className="font-semibold text-[#00B4C6] bg-transparent border-none cursor-pointer hover:text-[#0099aa] transition-colors" onClick={() => setMode("login")}>
                    Sign in
                  </button>
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-9 flex gap-4 items-center">
            {["Privacy","Terms","Help"].map((l, i) => (
              <span key={l}>
                <button className="text-[11.5px] text-slate-400 font-normal bg-transparent border-none cursor-pointer hover:text-[#00B4C6] transition-colors">{l}</button>
                {i < 2 && <span className="text-slate-200 ml-4">·</span>}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-slate-300 mt-2">© 2025 Weblance, Inc.</p>
        </div>
      </div>
    </>
  );
}