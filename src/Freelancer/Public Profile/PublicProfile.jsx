import { useState } from "react";
import AboutTab        from "./Public Profile/AboutTab";
import SkillsScoresTab from "./Public Profile/SkillsScoresTab";
import PortfolioTab    from "./Public Profile/PortfolioTab";
import ReviewsTab      from "./Public Profile/ReviewsTab";
import TrustTab        from "./Public Profile/TrustTab";

function SkillBadge({ label, type }) {
  const styles = {
    "pro+":     "bg-blue-100 text-blue-700 border border-blue-200",
    "verified": "bg-green-100 text-green-700 border border-green-200",
    "elite":    "bg-purple-100 text-purple-700 border border-purple-200",
  };
  const icons = {
    "pro+":  <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"/>,
    "verified": (
      <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
      </svg>
    ),
    "elite": <span className="w-2 h-2 rounded-full bg-purple-500 inline-block"/>,
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${styles[type]}`}>
      {icons[type]}
      {label}
    </span>
  );
}

function Tab({ label, active, onClick }) {
  return (
    <button onClick={onClick}
      className={`px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap
        ${active ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-800"}`}>
      {label}
    </button>
  );
}

export default function PublicProfile({ onBack }) {
  const [activeTab, setActiveTab] = useState("about");
  const [messageSent, setMessageSent] = useState(false);

  const tabs = [
    { key: "about",    label: "About"               },
    { key: "skills",   label: "Skills & Scores"     },
    { key: "portfolio",label: "Portfolio"           },
    { key: "reviews",  label: "Reviews"             },
    { key: "trust",    label: "Trust & Reliability" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <span className="text-blue-600 font-bold text-xl tracking-tight">ArcLancer</span>
        <div className="flex items-center gap-3">
          <button onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back
          </button>
          <button className="text-sm text-gray-700 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition">Demo</button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* Hero Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-3xl font-black text-blue-600 flex-shrink-0 border border-blue-200">
              J
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-black text-gray-900 mb-0.5">John Smith</h1>
              <p className="text-base text-gray-500 mb-2">Full-Stack React & Node.js Developer</p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  Mumbai, India
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  IST
                </span>
                <span className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => <span key={s} className={`text-sm ${s <= 3 ? "text-yellow-400" : "text-gray-200"}`}>star</span>)}
                </span>
                <span>3 projects</span>
                <span>star 4.9 avg rating</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <SkillBadge label="Pro+ React.js"      type="pro+"     />
                <SkillBadge label="Verified Node.js"   type="verified" />
                <SkillBadge label="Elite UI/UX Design" type="elite"    />
                <SkillBadge label="Pro+ TypeScript"    type="pro+"     />
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="font-semibold text-gray-800">$75/hr</span>
                <span className="text-green-600 font-semibold">Available Immediately</span>
                <span className="text-gray-500">40h/week</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0 w-44">
              <button className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition">
                Invite to Project
              </button>
              <button onClick={() => setActiveTab("portfolio")}
                className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-50 transition">
                View Portfolio
              </button>
              <button onClick={() => setMessageSent(true)}
                className={`flex items-center justify-center gap-2 border text-sm font-medium px-4 py-2.5 rounded-xl transition
                  ${messageSent ? "border-green-200 bg-green-50 text-green-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
                {messageSent ? "Message Sent" : "Message"}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="flex border-b border-gray-200 px-4 overflow-x-auto">
            {tabs.map(t => <Tab key={t.key} label={t.label} active={activeTab === t.key} onClick={() => setActiveTab(t.key)}/>)}
          </div>
          <div className="p-6">
            {activeTab === "about"     && <AboutTab />}
            {activeTab === "skills"    && <SkillsScoresTab />}
            {activeTab === "portfolio" && <PortfolioTab />}
            {activeTab === "reviews"   && <ReviewsTab />}
            {activeTab === "trust"     && <TrustTab />}
          </div>
        </div>

      </div>
    </div>
  );
}