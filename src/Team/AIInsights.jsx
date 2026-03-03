import { MdAutoAwesome } from "react-icons/md";

const insightsMap = {
  1: [
    { type: "info",    text: "Invitations are agency-bound and valid for 7 days. Make sure the email matches." },
  ],
  2: [
    { type: "info",    text: "Your account will be linked to TechVision Digital Agency automatically." },
    { type: "success", text: "No KYC or payment details needed — the platform pays your agency directly." },
  ],
  3: [
    { type: "info",    text: "Select skills that match your expertise for better project matches." },
    { type: "warn",    text: "Adding a GitHub profile increases your visibility to your agency admin." },
  ],
  4: [
    { type: "info",    text: "Permissions are set by your agency admin. Contact them to request changes." },
    { type: "warn",    text: "You cannot approve milestones or access financial data as a Developer." },
  ],
  5: [
    { type: "success", text: "You are now active! Your agency admin can assign projects to you." },
    { type: "info",    text: "Check your dashboard regularly for new project assignments." },
  ],
};

const typeStyles = {
  info:    "bg-blue-50  border-blue-200  text-blue-800",
  success: "bg-green-50 border-green-200 text-green-800",
  warn:    "bg-amber-50 border-amber-200 text-amber-800",
  error:   "bg-rose-50  border-rose-200  text-rose-800",
};

const typeIcon = {
  info:    "💡",
  success: "✅",
  warn:    "⚠️",
  error:   "⛔",
};

export default function AIInsights({ step }) {
  const cards = insightsMap[step] || [];

  return (
    <div className="w-full lg:w-[260px] lg:shrink-0 lg:sticky lg:top-6">
      <div className="bg-white border border-violet-200 rounded-2xl p-4 sm:p-5 shadow-sm">

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0">
            <MdAutoAwesome className="text-violet-700 text-sm" />
          </div>
          <span className="text-sm font-bold text-violet-700">AI Insights</span>
        </div>

        {/* Insight cards */}
        <div className="flex flex-col gap-2.5">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${typeStyles[card.type]}`}
            >
              <span className="text-sm flex-shrink-0 mt-0.5">{typeIcon[card.type]}</span>
              <p>{card.text}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}