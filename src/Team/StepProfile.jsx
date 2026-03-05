import { useState } from "react";

const allSkills = ["React","Node.js","Python","TypeScript","Go","Rust","PostgreSQL","Docker","AWS","GraphQL","Next.js","Vue.js"];
const experienceLevels = [
  { label:"Junior",      sub:"0-2 years"  },
  { label:"Mid-level",   sub:"2-5 years"  },
  { label:"Senior",      sub:"5-10 years" },
  { label:"Lead/Expert", sub:"10+ years"  },
];

export default function StepProfile() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [experience,     setExperience]     = useState("");
  const [availability,   setAvailability]   = useState(30);
  const [github,         setGithub]         = useState("");

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else if (selectedSkills.length < 8) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Professional Profile</h2>
      <p className="text-sm text-gray-500 mb-5">Help your agency assign the right projects to you</p>

      {/* Role badge */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="text-xs font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded">DEVELOPER</span>
        <span className="text-xs text-gray-400">Role assigned by your agency admin</span>
      </div>

      <div className="flex flex-col gap-5">

        {/* Skills */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-800 flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 12V7l5-6 5 6v5" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 12V9h4v3" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Skills *
            </label>
            <span className={`text-xs font-medium ${selectedSkills.length >= 8 ? "text-red-500" : "text-gray-400"}`}>
              {selectedSkills.length}/8
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allSkills.map(skill => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                  selectedSkills.includes(skill)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-500"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Level — 1 col mobile, 2 col sm+ */}
        <div>
          <label className="text-sm font-semibold text-gray-800 block mb-3">Experience Level *</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {experienceLevels.map(lvl => (
              <button
                key={lvl.label}
                onClick={() => setExperience(lvl.label)}
                className={`flex items-center gap-3 border rounded-xl px-4 py-3.5 text-left transition-colors ${
                  experience === lvl.label
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  experience === lvl.label ? "border-blue-500" : "border-gray-300"
                }`}>
                  {experience === lvl.label && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{lvl.label}</div>
                  <div className="text-xs text-gray-400">{lvl.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Availability Slider */}
        <div>
          <label className="text-sm font-semibold text-gray-800 block mb-3">
            Availability: <span className="text-blue-500">{availability} hours/week</span>
          </label>
          <input
            type="range"
            min={10}
            max={40}
            step={5}
            value={availability}
            onChange={e => setAvailability(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1.5">
            <span>10h (Part-time)</span>
            <span>40h (Full-time)</span>
          </div>
        </div>

        {/* GitHub */}
        <div>
          <label className="text-sm font-semibold text-gray-800 block mb-2">
            GitHub Profile <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 bg-white focus-within:ring-2 focus-within:ring-blue-200">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
              <path d="M7 1C3.686 1 1 3.686 1 7c0 2.654 1.72 4.903 4.104 5.697.3.055.41-.13.41-.288 0-.143-.005-.52-.008-1.02-1.67.363-2.02-.805-2.02-.805-.273-.694-.667-.879-.667-.879-.545-.373.041-.365.041-.365.602.042.92.618.92.618.536.918 1.408.653 1.75.499.054-.388.21-.653.382-.803-1.333-.152-2.733-.667-2.733-2.967 0-.655.234-1.19.618-1.61-.062-.152-.268-.762.059-1.588 0 0 .504-.161 1.65.615A5.74 5.74 0 017 4.596c.51.002 1.023.069 1.502.202 1.145-.776 1.648-.615 1.648-.615.329.826.122 1.436.06 1.588.385.42.617.955.617 1.61 0 2.307-1.403 2.813-2.74 2.962.215.186.407.551.407 1.11 0 .803-.007 1.45-.007 1.647 0 .16.108.347.413.288A6.004 6.004 0 0013 7c0-3.314-2.686-6-6-6z" fill="#6b7280"/>
            </svg>
            <input
              type="url"
              placeholder="https://github.com/username"
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none min-w-0"
              value={github}
              onChange={e => setGithub(e.target.value)}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
