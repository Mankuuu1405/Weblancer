export default function TrustTab() {
  const metrics = [
    {
      label: "Response Time",
      value: "Avg. 1.2 hours",
      badge: "✅ Excellent",
      badgeColor: "text-green-600",
    },
    {
      label: "On-time Delivery",
      value: "96%",
      badge: "✅",
      badgeColor: "text-green-600",
    },
    {
      label: "Dispute Rate",
      value: "0%",
      badge: "✅",
      badgeColor: "text-green-600",
    },
    {
      label: "Repeat Client Rate",
      value: "42% (clients return)",
      badge: null,
    },
    {
      label: "Client Sentiment",
      value: "Positive (AI-analyzed)",
      badge: null,
    },
  ];

  const howCalculated = [
    "Response time: tracked from notification to reply",
    "On-time delivery: milestone submissions vs due dates",
    "Sentiment: NLP analysis on all client messages and reviews",
    "Recalculated daily by automated scoring engine",
  ];

  return (
    <div className="space-y-4">

      {/* Trust Metrics card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
          </svg>
          <h2 className="text-base font-bold text-gray-900">Trust Metrics</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {metrics.map((m, i) => (
            <div key={i} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
              <span className="text-sm text-gray-600">{m.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">{m.value}</span>
                {m.badge && (
                  <span className={`text-sm font-semibold ${m.badgeColor}`}>{m.badge}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How trust metrics are calculated */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-3">How trust metrics are calculated:</h3>
        <ul className="space-y-1.5">
          {howCalculated.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
              <span className="text-gray-400 flex-shrink-0">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}