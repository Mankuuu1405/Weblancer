export default function SkillsScoresTab() {
  const skills = [
    { name: "React.js",     badge: "Pro+",     badgeType: "pro+",     score: 84, barColor: "bg-blue-500"   },
    { name: "Node.js",      badge: "Verified", badgeType: "verified", score: 71, barColor: "bg-green-500"  },
    { name: "UI/UX Design", badge: "Elite",    badgeType: "elite",    score: 92, barColor: "bg-purple-500" },
    { name: "TypeScript",   badge: "Pro+",     badgeType: "pro+",     score: 78, barColor: "bg-blue-500"   },
  ];

  const badgeStyles = {
    "pro+":     { wrap: "bg-blue-50 text-blue-700 border border-blue-200",    dot: <span className="w-2 h-2 rounded-full bg-blue-500 inline-block flex-shrink-0"/> },
    "verified": { wrap: "bg-green-50 text-green-700 border border-green-200", dot: (
        <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
      )
    },
    "elite":    { wrap: "bg-purple-50 text-purple-700 border border-purple-200", dot: <span className="w-2 h-2 rounded-full bg-purple-500 inline-block flex-shrink-0"/> },
  };

  return (
    <div className="space-y-4">

      {/* Skill Confidence Scores card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">

        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
          </svg>
          <h2 className="text-base font-bold text-gray-900">Skill Confidence Scores</h2>
        </div>

        {/* Skill rows */}
        <div className="space-y-6">
          {skills.map((s, i) => (
            <div key={i}>
              {/* Skill name + badge + score */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{s.name}</span>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeStyles[s.badgeType].wrap}`}>
                    {badgeStyles[s.badgeType].dot}
                    {s.badge}
                  </span>
                </div>
                <span className="text-lg font-black text-gray-900">{s.score}/100</span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-2 mb-1.5 overflow-hidden">
                <div
                  className={`h-2 rounded-full ${s.barColor} transition-all duration-700`}
                  style={{ width: `${s.score}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">From: Test + Portfolio + Interview scores combined</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mt-6 pt-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Overall Skill Trustworthiness</h3>
              <p className="text-xs text-gray-500 mt-1">Matching Tier: Rising Talent → Top Rated approaching</p>
            </div>
            <span className="text-xl font-black text-gray-900">82/100</span>
          </div>
        </div>
      </div>

      {/* Badge Levels legend */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <p className="text-sm font-bold text-gray-800 mb-4">Badge Levels:</p>
        <div className="grid grid-cols-2 gap-y-3 gap-x-6">

          {/* Elite */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="w-3 h-3 rounded-full bg-purple-500 flex-shrink-0"/>
            Elite (90–100)
          </div>

          {/* Pro+ */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0"/>
            Pro+ (75–89)
          </div>

          {/* Verified */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            Verified (60–74)
          </div>

          {/* Unverified */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <div className="w-4 h-4 border-2 border-gray-300 rounded-sm flex-shrink-0"/>
            Unverified (&lt;60)
          </div>

        </div>
      </div>

    </div>
  );
}