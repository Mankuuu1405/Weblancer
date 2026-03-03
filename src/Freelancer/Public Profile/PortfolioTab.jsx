export default function PortfolioTab() {
  const projects = [
    {
      title: "E-commerce Mobile App",
      type: "Client project",
      duration: "3 months",
      tags: ["React Native", "Node.js", "PostgreSQL"],
      metric: "50K+ USERS",
      metricColor: "bg-green-50 text-green-700 border-green-200",
      link: "#",
    },
    {
      title: "SaaS Analytics Dashboard",
      type: "Client project",
      duration: "2 months",
      tags: ["React", "TypeScript", "D3.js"],
      metric: "40% PERFORMANCE IMPROVEMENT",
      metricColor: "bg-blue-50 text-blue-700 border-blue-200",
      link: "#",
    },
    {
      title: "Food Delivery Platform",
      type: "Client project",
      duration: "4 months",
      tags: ["React Native", "Firebase", "Node.js"],
      metric: "4.9★ CLIENT RATING",
      metricColor: "bg-yellow-50 text-yellow-700 border-yellow-200",
      link: "#",
    },
    {
      title: "Real-time Chat Application",
      type: "Personal project",
      duration: "6 weeks",
      tags: ["React", "Socket.io", "PostgreSQL"],
      metric: "OPEN SOURCE",
      metricColor: "bg-purple-50 text-purple-700 border-purple-200",
      link: "#",
    },
  ];

  return (
    <div className="space-y-3">
      {projects.map((p, i) => (
        <div key={i}
          className="bg-white border border-gray-200 rounded-2xl px-6 py-5 hover:shadow-sm hover:border-blue-200 transition-all group">
          <div className="flex items-start justify-between gap-4">

            {/* Left: info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-gray-400 mb-3">
                {p.type} · {p.duration}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map(tag => (
                  <span key={tag}
                    className="text-xs bg-gray-50 text-gray-600 border border-gray-200 px-2.5 py-0.5 rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: metric badge + link */}
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${p.metricColor}`}>
                {p.metric}
              </span>
              <a href={p.link}
                className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 font-semibold transition opacity-0 group-hover:opacity-100">
                View
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}