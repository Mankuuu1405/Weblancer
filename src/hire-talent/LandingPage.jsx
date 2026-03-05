import { useNavigate } from "react-router-dom";

/* ─── Feature card data ─── */
const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3"  y="3"  width="7" height="7" rx="1" strokeWidth="1.8"/>
        <rect x="14" y="3"  width="7" height="7" rx="1" strokeWidth="1.8"/>
        <rect x="3"  y="14" width="7" height="7" rx="1" strokeWidth="1.8"/>
        <path d="M17 14v6m-3-3h6" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: "AI Project Definition",
    desc: "No technical knowledge needed",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Verified Talent",
    desc: "Background-checked professionals",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="5" y="11" width="14" height="10" rx="2" strokeWidth="1.8"/>
        <path d="M8 11V7a4 4 0 018 0v4" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: "Secure Payments",
    desc: "Pay only when satisfied",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Admin Protection",
    desc: "You're never alone if issues arise",
  },
];

const STATS = [
  { value: "94%",     label: "Completion Rate",       star: false },
  { value: "12,000+", label: "Active Projects",        star: false },
  { value: "8,500+",  label: "Verified Professionals", star: false },
  { value: "4.8",     label: "Avg Rating",             star: true  },
];

/* ─── Component ─── */
export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: "#eef2ff" }}
    >

      {/* ══ NAVBAR ══ */}
      <nav
        className="sticky top-0 z-50"
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div
          className="mx-auto px-6 lg:px-10 h-16 flex items-center justify-between"
          style={{ maxWidth: "1280px" }}
        >
          <span
            className="text-2xl font-extrabold cursor-pointer"
            style={{ color: "#3b5bdb" }}
            onClick={() => navigate("/hire-talent")}
          >
            ArcLancer
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/hire-talent/onboarding")}
              className="text-sm font-medium px-4 py-2"
              style={{ color: "#374151" }}
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/hire-talent/onboarding")}
              className="text-sm font-bold px-5 py-2.5 rounded-lg text-white"
              style={{ backgroundColor: "#3b5bdb" }}
            >
              Hire Talent
            </button>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section className="pt-16 pb-12 px-4 text-center">

        {/* Badge */}
        <div className="flex justify-center mb-5">
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{
              backgroundColor: "#e0e7ff",
              color: "#3b5bdb",
              border: "1.5px solid #a5b4fc",
            }}
          >
            Client Platform
          </span>
        </div>

        {/* Heading */}
        <h1
          className="font-extrabold leading-tight mb-5 mx-auto"
          style={{
            fontSize: "clamp(2.8rem, 6vw, 4rem)",
            color: "#1e293b",
            maxWidth: "700px",
            lineHeight: 1.1,
          }}
        >
          Turn Your Ideas<br />Into Reality
        </h1>

        {/* Subtitle */}
        <p
          className="text-base mb-10 mx-auto"
          style={{ color: "#64748b", maxWidth: "500px" }}
        >
          AI-powered project planning &bull; Verified talent &bull; Secure payments
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/hire-talent/onboarding")}
            className="flex items-center gap-2.5 font-bold px-7 py-4 rounded-xl text-white text-base"
            style={{ backgroundColor: "#3b5bdb" }}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3"  y="3"  width="7" height="7" rx="1" strokeWidth="2"/>
              <rect x="14" y="3"  width="7" height="7" rx="1" strokeWidth="2"/>
              <rect x="3"  y="14" width="7" height="7" rx="1" strokeWidth="2"/>
              <path d="M17 14v6m-3-3h6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Hire Talent / Post a Project &rarr;
          </button>

          <button
            onClick={() => document.getElementById("protection-section")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2.5 font-semibold px-7 py-4 rounded-xl border text-base"
            style={{
              backgroundColor: "white",
              color: "#374151",
              borderColor: "#d1d5db",
            }}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            How It Works
          </button>
        </div>
      </section>

      {/* ══ FEATURE CARDS ══
          Reference: all 4 cards white with border, same style   */}
      <section className="pb-16 px-4">
        <div
          className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          style={{ maxWidth: "1100px" }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-5 px-8 py-12"
              style={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
              }}
            >
              {/* Rounded-square icon bg */}
              <div
                className="w-14 h-14 flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: "#e0e7ff",
                  borderRadius: "14px",
                  color: "#3b5bdb",
                }}
              >
                {f.icon}
              </div>

              <div>
                <h3
                  className="font-bold text-base mb-1.5"
                  style={{ color: "#1e293b" }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#94a3b8" }}
                >
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PROTECTION SECTION ══ */}
      <section id="protection-section" className="pb-14 px-4">
        <div
          className="mx-auto rounded-3xl p-10 sm:p-14"
          style={{
            maxWidth: "860px",
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
          }}
        >
          <h2
            className="font-extrabold text-center mb-10"
            style={{
              fontSize: "clamp(1.2rem, 2.8vw, 1.6rem)",
              color: "#1e293b",
            }}
          >
            You won't be left alone if something goes wrong
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-5">
            {/* Left */}
            <div className="flex flex-col gap-5">
              {["Escrow protection", "Quality guarantees", "Dispute resolution"].map(item => (
                <ProtectionItem key={item} label={item} />
              ))}
            </div>
            {/* Right */}
            <div className="flex flex-col gap-5">
              {["Milestone approvals", "24/7 admin support"].map(item => (
                <ProtectionItem key={item} label={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS ══
          Reference: plain numbers directly on page bg, no card   */}
      <section className="pb-24 px-4">
        <div
          className="mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center"
          style={{ maxWidth: "860px" }}
        >
          {STATS.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="flex items-center gap-1.5">
                <span
                  className="font-extrabold tracking-tight"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 2.8rem)",
                    color: "#1e293b",
                  }}
                >
                  {s.value}
                </span>
                {s.star && (
                  <span style={{ fontSize: "1.6rem", color: "#f59e0b", lineHeight: 1 }}>
                    ★
                  </span>
                )}
              </div>
              <span
                className="text-sm font-medium mt-1"
                style={{ color: "#64748b" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

/* ─── Helper ─── */
function ProtectionItem({ label }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "#dcfce7" }}
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="#22c55e"
          viewBox="0 0 24 24"
        >
          <path
            d="M5 13l4 4L19 7"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-base" style={{ color: "#374151" }}>
        {label}
      </span>
    </div>
  );
}
