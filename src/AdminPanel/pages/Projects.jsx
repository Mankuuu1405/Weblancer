import React, { useState } from "react";

const projectsData = [
  { id: 1, name: "Food Delivery App",      client: "John D.",    freelancer: "TechVision Agency", type: "agency",     amount: 42000, status: "healthy", milestone: "M2 — Core Dev (55%)",        alert: null,                                               tickets: 0, silence: null,       frozen: false },
  { id: 2, name: "Brand Identity Package", client: "StartupX",   freelancer: "Sara M.",           type: "freelancer", amount: 3500,  status: "warning", milestone: "M1 — Concepts (80%)",        alert: "Silence alert: 5 days no response from freelancer", tickets: 1, silence: "5D SILENCE", frozen: false },
  { id: 3, name: "API Integration",        client: "DataCo",     freelancer: "Dev Mike",          type: "freelancer", amount: 8000,  status: "healthy", milestone: "M2 — Implementation (30%)", alert: null,                                               tickets: 0, silence: null,       frozen: false },
  { id: 4, name: "E-commerce Site",        client: "FashionHub", freelancer: "CodeCraft Agency",  type: "agency",     amount: 28000, status: "frozen",  milestone: "M1 — Design (100%)",         alert: "Frozen: Active dispute over milestone scope",       tickets: 2, silence: null,       frozen: true  },
];

/* ── green shades palette ──
   #1A3D1F  darkest green  (text, headings)
   #2A5C30  dark green     (strong accents)
   #4A9B55  mid green      (icons, badges)
   #6FDA44  bright green   (highlights, borders)
   #D4F7BC  lightest green (backgrounds)
   blue accent: #2563EB / #DBEAFE
*/

const statusIcon = {
  healthy: (
    <span className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-xs font-bold shrink-0"
      style={{ background: "#D4F7BC", color: "#2A5C30" }}>✓</span>
  ),
  warning: (
    <span className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-xs font-bold shrink-0"
      style={{ background: "#FEF3C7", color: "#92400E" }}>⚠</span>
  ),
  frozen: (
    <span className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-xs font-bold shrink-0"
      style={{ background: "#DBEAFE", color: "#1D4ED8" }}>❄</span>
  ),
};

const borderColor = {
  healthy: "border-l-[#6FDA44]",
  warning: "border-l-amber-400",
  frozen:  "border-l-[#2563EB]",
};

const Projects = () => {
  const [projects] = useState(projectsData);
  const healthy = projects.filter((p) => p.status === "healthy").length;
  const warning = projects.filter((p) => p.status === "warning").length;
  const frozen  = projects.filter((p) => p.status === "frozen").length;

  const stats = [
    { num: projects.length, label: "Active Projects", from: "#1A3D1F", to: "#2A5C30" },
    { num: healthy,         label: "Healthy",         from: "#4A9B55", to: "#6FDA44" },
    { num: warning,         label: "Needs Attention", from: "#D97706", to: "#F59E0B" },
    { num: frozen,          label: "Frozen",          from: "#1D4ED8", to: "#2563EB" },
  ];

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-7">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl px-4 py-6 text-center border border-white/60 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${s.from}18, ${s.to}28)`,
              boxShadow: `0 2px 10px ${s.from}18`,
              borderColor: `${s.to}40`,
            }}
          >
            <div
              className="text-4xl font-extrabold leading-none mb-2"
              style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              {s.num}
            </div>
            <div className="text-xs font-medium" style={{ color: s.from }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Project Cards */}
      {projects.map((p) => (
        <div
          key={p.id}
          className={`bg-white border border-gray-100 border-l-4 ${borderColor[p.status]} rounded-2xl px-5 sm:px-6 py-5 mb-3.5 hover:-translate-y-px transition-all`}
          style={{ boxShadow: "0 2px 12px rgba(111,218,68,0.08)" }}
        >
          {/* Top */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 mb-1">
                {statusIcon[p.status]}
                <h3 className="text-base font-bold" style={{ color: "#1A3D1F" }}>{p.name}</h3>
              </div>
              <div className="text-xs text-gray-400 ml-8 mb-2">{p.client} → {p.freelancer} ({p.type})</div>
              {p.alert && (
                <div className="text-xs text-amber-600 ml-8 flex items-center gap-1">⚠ {p.alert}</div>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap ml-8 sm:ml-0 shrink-0">
              <span
                className="text-base font-bold px-3 py-1 rounded-lg"
                style={{ background: "linear-gradient(135deg,#D4F7BC,#b8f0a0)", color: "#1A3D1F" }}
              >
                ${p.amount.toLocaleString()}
              </span>
              {p.tickets > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  🎫 {p.tickets} TICKET{p.tickets > 1 ? "S" : ""}
                </span>
              )}
              {p.silence && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800">
                  ⏰ {p.silence}
                </span>
              )}
              {p.frozen && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{ background: "#DBEAFE", color: "#1D4ED8" }}>
                  ❄ FROZEN
                </span>
              )}
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-4 border-t border-gray-100">
            <span className="text-xs ml-8" style={{ color: "#4A9B55" }}>{p.milestone}</span>
            <div className="flex gap-2 ml-8 sm:ml-0">
              <button
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer border"
                style={{ background: "#D4F7BC", borderColor: "#6FDA44", color: "#1A3D1F" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#6FDA44"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#D4F7BC"; }}
              >
                👁 Open Stream
              </button>
              <button
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer border"
                style={{ background: "#DBEAFE", borderColor: "#2563EB", color: "#1D4ED8" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#2563EB"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#DBEAFE"; e.currentTarget.style.color = "#1D4ED8"; }}
              >
                💬 Post Message
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;