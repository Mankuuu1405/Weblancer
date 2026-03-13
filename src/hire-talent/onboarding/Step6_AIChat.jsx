import { useState, useEffect, useRef } from "react";

/* ── Scripted AI conversation flow ── */
const FLOW = [
  {
    ai: "Thanks for sharing your idea! Let me ask a few questions. First — is this for web, mobile, or both?",
    chips: ["Web only", "Mobile only", "Both web and mobile", "Not sure yet"],
  },
  {
    ai: "Got it! Do you already have a design or wireframe in mind?",
    chips: ["Yes, I have designs", "Just rough sketches", "No, starting from scratch", "Need help with design too"],
  },
  {
    ai: "Great. What's your rough timeline for this project?",
    chips: ["ASAP (under 1 month)", "1–3 months", "3–6 months", "Flexible / ongoing"],
  },
  {
    ai: "Almost done! Do you have a budget range in mind?",
    chips: ["Under ₹50,000", "₹50k – ₹2L", "₹2L – ₹10L", "₹10L+", "Not sure yet"],
  },
  {
    ai: "Perfect! I have enough context to generate your project blueprint. Click 'Generate Blueprint' when ready.",
    chips: [],
  },
];

export default function Step6_AIChat({ formData, updateData, next, prev }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: FLOW[0].ai, chips: FLOW[0].chips },
  ]);
  const [input, setInput]         = useState("");
  const [flowIdx, setFlowIdx]     = useState(0);
  const [understanding, setUnderstanding] = useState(0);
  const chatRef = useRef(null);

  /* Auto-scroll to bottom on new message */
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const advance = (userText) => {
    const next_ = flowIdx + 1;
    const newPct = Math.min(Math.round((next_ / (FLOW.length - 1)) * 100), 100);

    setMessages(prev => {
      // Remove chips from current AI message
      const updated = prev.map((m, i) =>
        i === prev.length - 1 && m.role === "ai" ? { ...m, chips: [] } : m
      );
      const withUser = [...updated, { role: "user", text: userText }];
      if (next_ < FLOW.length) {
        return [...withUser, { role: "ai", text: FLOW[next_].ai, chips: FLOW[next_].chips }];
      }
      return withUser;
    });

    setFlowIdx(next_);
    setUnderstanding(newPct);
    setInput("");
  };

  const handleChip = (chip) => advance(chip);

  const handleSend = () => {
    if (!input.trim()) return;
    advance(input.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const canGenerate = flowIdx >= FLOW.length - 1;

  const handleNext = () => {
    updateData({ aiChat: messages });
    next();
  };

  return (
    <div className="flex gap-6 items-start">

      {/* ══ LEFT ════════════════════════════════════════════ */}
      <div className="flex-1 min-w-0">
        <div className="rounded-2xl overflow-hidden"
             style={{ backgroundColor: "white", border: "1px solid #e2e8f0" }}>

          {/* Header */}
          <div className="px-8 pt-8 pb-4">
            <h1 className="text-2xl font-extrabold mb-1" style={{ color: "#1e293b" }}>
              Let's Refine Your Idea
            </h1>
            <p className="text-sm mb-5" style={{ color: "#64748b" }}>
              AI will ask a few questions to understand your project better
            </p>

            {/* Badge */}
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded mb-4"
              style={{ backgroundColor: "#e0e7ff", color: "#3b5bdb", border: "1px solid #a5b4fc" }}
            >
              AI Conversation
            </span>
          </div>

          {/* Chat area */}
          <div
            ref={chatRef}
            className="px-6 pb-4 flex flex-col gap-5 overflow-y-auto"
            style={{ minHeight: "320px", maxHeight: "420px" }}
          >
            {messages.map((msg, i) => (
              <div key={i}>
                {msg.role === "ai" ? (
                  <div className="flex items-start gap-3">
                    {/* AI avatar */}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                         style={{ backgroundColor: "#e0e7ff" }}>
                      <svg className="w-4 h-4" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
                        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-3">
                      {/* Bubble */}
                      <div className="px-4 py-3 rounded-2xl rounded-tl-none text-sm max-w-lg"
                           style={{ backgroundColor: "#f0f4ff", color: "#1e293b" }}>
                        {msg.text}
                      </div>
                      {/* Quick reply chips */}
                      {msg.chips && msg.chips.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {msg.chips.map(chip => (
                            <button
                              key={chip}
                              onClick={() => handleChip(chip)}
                              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                              style={{ border: "1px solid #a5b4fc", backgroundColor: "white", color: "#3b5bdb" }}
                              onMouseOver={e => { e.currentTarget.style.backgroundColor = "#e0e7ff"; }}
                              onMouseOut={e  => { e.currentTarget.style.backgroundColor = "white"; }}
                            >
                              {chip}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* User message — right aligned */
                  <div className="flex justify-end">
                    <div className="px-4 py-3 rounded-2xl rounded-tr-none text-sm max-w-xs"
                         style={{ backgroundColor: "#3b5bdb", color: "white" }}>
                      {msg.text}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Text input row */}
          <div className="px-6 pb-6 pt-2"
               style={{ borderTop: "1px solid #e2e8f0" }}>
            <div className="flex items-center gap-2 mt-3">
              <input
                type="text"
                placeholder="Type your answer..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={canGenerate}
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  border: "1px solid #e2e8f0",
                  backgroundColor: canGenerate ? "#f8fafc" : "white",
                  color: "#1e293b",
                }}
                onFocus={e => e.target.style.borderColor = "#3b5bdb"}
                onBlur={e  => e.target.style.borderColor = "#e2e8f0"}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || canGenerate}
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  backgroundColor: input.trim() && !canGenerate ? "#3b5bdb" : "#e0e7ff",
                  cursor: input.trim() && !canGenerate ? "pointer" : "default",
                }}
              >
                <svg className="w-4 h-4" fill="none"
                     stroke={input.trim() && !canGenerate ? "white" : "#94a3b8"}
                     viewBox="0 0 24 24">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Nav buttons */}
        <div className="flex items-center justify-between mt-6 pb-10">
          <button onClick={prev}
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "#374151" }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canGenerate}
            className="flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl text-white text-sm transition-all"
            style={{
              backgroundColor: canGenerate ? "#3b5bdb" : "#93c5fd",
              cursor: canGenerate ? "pointer" : "not-allowed",
            }}
          >
            Generate Blueprint
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ══ RIGHT: AI Insights ══════════════════════════════ */}
      <div className="hidden lg:block w-72 flex-shrink-0 sticky top-24">
        <div className="rounded-2xl p-5"
             style={{ backgroundColor: "white", border: "1px solid #e2e8f0" }}>
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-bold text-sm" style={{ color: "#1e293b" }}>AI Insights</span>
          </div>

          {/* Understanding progress */}
          <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm mb-3"
               style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8" }}>
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Understanding your project: {understanding}%
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full mb-3" style={{ backgroundColor: "#e2e8f0" }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${understanding}%`, backgroundColor: "#3b5bdb" }}
            />
          </div>

          {canGenerate && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                 style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d" }}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Ready to generate your blueprint!
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
