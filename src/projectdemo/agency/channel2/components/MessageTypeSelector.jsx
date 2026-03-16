import { useState, useRef, useEffect } from "react";
import { messageTypes } from "../data/dummyData";

export default function MessageTypeSelector({ selectedType, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const current = messageTypes.find((t) => t.value === selectedType) || messageTypes[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const typeStyles = {
    normal:   { pill: "bg-gray-100 text-gray-600 hover:bg-gray-200",   dot: "bg-gray-400"  },
    update:   { pill: "bg-blue-50 text-blue-700 hover:bg-blue-100",    dot: "bg-blue-500"  },
    decision: { pill: "bg-green-50 text-green-700 hover:bg-green-100", dot: "bg-green-500" },
    warning:  { pill: "bg-amber-50 text-amber-700 hover:bg-amber-100", dot: "bg-amber-500" },
  };

  const descriptions = {
    normal: "Regular message", update: "Progress or task update",
    decision: "Final decision — locked", warning: "Urgent alert or risk",
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${typeStyles[selectedType]?.pill || typeStyles.normal.pill}`}
      >
        <span className={`w-2 h-2 rounded-full ${typeStyles[selectedType]?.dot || typeStyles.normal.dot}`} />
        {current.label}
        <svg className={`w-3 h-3 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
          <div className="p-1">
            {messageTypes.map((type) => {
              const s = typeStyles[type.value];
              const isSelected = selectedType === type.value;
              return (
                <button key={type.value} type="button"
                  onClick={() => { onSelect(type.value); setIsOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left hover:bg-gray-50 ${isSelected ? "bg-gray-50 ring-1 ring-inset ring-gray-200" : ""}`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold ${s.pill.split(" ")[1]}`}>{type.label}</p>
                    <p className="text-xs text-gray-400 truncate">{descriptions[type.value]}</p>
                  </div>
                  {isSelected && (
                    <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}