export default function AboutTab() {
  const completedProjects = 3;

  return (
    <div className="space-y-4">

      {/* About bio + social links */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h2 className="text-sm font-bold text-gray-900 mb-3">About</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-5">
          John is a full-stack React and Node.js developer with 5+ years of experience building
          production-grade web applications. Specializing in e-commerce and SaaS platforms, he has
          delivered 23 projects across 8 countries with a 4.9-star client satisfaction rating. His
          code quality is AI-verified at 84/100, and his portfolio includes 3 live applications
          serving 50K+ users. Available immediately for full-time engagement.
        </p>

        {/* Social links */}
        <div className="flex flex-wrap gap-5 pt-4 border-t border-gray-100">
          <a href="#" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            github.com/johnsmith
          </a>
          <a href="#" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            linkedin.com/in/johnsmith
          </a>
          <a href="#" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
            </svg>
            johnsmith.dev
          </a>
        </div>
      </div>

      {/* Star Progression */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-yellow-400 text-lg">⭐</span>
          <h2 className="text-sm font-bold text-gray-900">Star Progression</h2>
        </div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-yellow-400">⭐</span>
          <p className="text-sm text-gray-600">
            1 star per completed project · Current:{" "}
            <span>
              {[1,2,3,4,5].map(s => (
                <span key={s} className={`text-base ${s <= completedProjects ? "text-yellow-400" : "text-gray-300"}`}>★</span>
              ))}
            </span>
            {" "}<span className="text-gray-500">({completedProjects})</span>
          </p>
        </div>
        <p className="text-xs text-gray-400">Bio auto-updates as projects are completed.</p>
      </div>

    </div>
  );
}
