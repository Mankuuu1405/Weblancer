export default function ReviewsTab() {
  const reviews = [
    {
      client: "TechVision Co.",
      date: "Jan 2026",
      rating: 5,
      text: '"Excellent work on our frontend. Delivered ahead of schedule with great code quality."',
    },
    {
      client: "GlobalShop Ltd.",
      date: "Dec 2025",
      rating: 5,
      text: '"Very professional and responsive. Would hire again."',
    },
    {
      client: "StartupXYZ",
      date: "Nov 2025",
      rating: 4,
      text: '"Good developer, solid work. Minor delays but communicated well."',
    },
  ];

  return (
    <div className="space-y-3">
      {reviews.map((r, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-2xl px-6 py-5">

          {/* Header row: client + date on left, stars on right */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900">{r.client}</span>
              <span className="text-sm text-gray-400">{r.date}</span>
            </div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(s => (
                <span key={s}
                  className={`text-lg ${s <= r.rating ? "text-yellow-400" : "text-gray-200"}`}>
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Review text */}
          <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>

        </div>
      ))}
    </div>
  );
}
