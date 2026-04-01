// import { useState } from "react";
// import { PageHeader, SectionCard, ActionBtn } from "./AdminComponents";


// /* ── Freelancer Contracts theme tokens ───────────────────────
//    GREEN:  #A8E063 (light) → #6EC030 (mid) → #2E7D1F (deep)
//    NAVY:   #4A6FA5 (light) → #1A2B5E (mid) → #0F1A3B (deep)
//    ──────────────────────────────────────────────────────────── */
// const G = {
//   greenLight:  "#A8E063",
//   green:       "#6EC030",
//   greenDeep:   "#2E7D1F",
//   greenBg:     "#f1fce8",
//   greenBorder: "#d4edbb",

//   navyLight:   "#4A6FA5",
//   navy:        "#1A2B5E",
//   navyDeep:    "#0F1A3B",
//   navyBg:      "#e8edf7",
//   navyBorder:  "#b8c6e0",

//   gradGreen: "linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
//   gradNavy:  "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",

//   text:        "#1C1C1C",
//   sub:         "#4b5563",
//   muted:       "#9ca3af",
//   border:      "#e5e7eb",
//   bg:          "#f9fafb",
//   white:       "#ffffff",

//   amber:       "#f59e0b",
//   amberBg:     "#fffbeb",
//   amberBorder: "#fde68a",
//   amberText:   "#92400e",
//   red:         "#ef4444",
//   redBg:       "#fef2f2",
//   redBorder:   "#fecaca",
//   redText:     "#dc2626",
//   blue:        "#3b82f6",
//   blueBg:      "#eff6ff",
//   blueBorder:  "#bfdbfe",
//   blueText:    "#1d4ed8",
//   purple:      "#8b5cf6",
//   purpleBg:    "#f5f3ff",
//   purpleBorder:"#ddd6fe",
//   purpleText:  "#6d28d9",
// };
// const FONT = "'Poppins', sans-serif";

//   const btnNavy = {
//   display: "inline-flex", alignItems: "center", gap: 6,
//   fontSize: 12, fontWeight: 700, fontFamily: FONT,
//   background: G.gradNavy, color: G.white,
//   border: "none", borderRadius: 100,
//   padding: "8px 18px", cursor: "pointer",
//   boxShadow: "0 3px 12px rgba(15,26,59,0.25)",
//   whiteSpace: "nowrap",
// };

// const btnOutline = {
//   display: "inline-flex", alignItems: "center", gap: 6,
//   fontSize: 12, fontWeight: 700, fontFamily: FONT,
//   background: G.greenBg, color: G.greenDeep,
//   border: `1px solid ${G.greenBorder}`,
//   borderRadius: 100, padding: "8px 18px", cursor: "pointer",
//   whiteSpace: "nowrap",
// };
// function Toggle({ value, onChange, label, desc }) {
//   return (
//     <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
//       <div className="flex-1 mr-4">
//         <p className="text-sm font-medium text-gray-800">{label}</p>
//         {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
//       </div>
//       <button
//         onClick={() => onChange(!value)}
//         className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${value ? "bg-[#4A6FA5]" : "bg-gray-200"}`}
//       >
//         <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? "translate-x-0.5" : "-translate-x-[18px]"}`} />
//       </button>
//     </div>
//   );
// }

// function Slider({ value, onChange, label, desc, min = 0, max = 100, unit = "%" }) {
//   return (
//     <div className="py-3 border-b border-gray-50 last:border-0">
//       <div className="flex items-center justify-between mb-2">
//         <div>
//           <p className="text-sm font-medium text-gray-800">{label}</p>
//           {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
//         </div>
//         <span className="text-sm font-bold text-green-600 ml-4">{value}{unit}</span>
//       </div>
//       <input
//         type="range" min={min} max={max} value={value}
//         onChange={(e) => onChange(Number(e.target.value))}
//         className="w-full accent-green-500 h-1.5 rounded-full"
//       />
//       <div className="flex justify-between text-[10px] text-gray-300 mt-1">
//         <span>{min}{unit}</span>
//         <span>{max}{unit}</span>
//       </div>
//     </div>
//   );
// }

// export default function AdminAISettings() {
//   const [settings, setSettings] = useState({
//     // Automation
//     autoApproveMillestones: true,
//     silenceAutoAction: true,
//     autoSuspendHighRisk: false,
//     autoReduceVisibility: true,
//     autoBoostTopFreelancers: true,

//     // Thresholds
//     autoActionConfidence: 90,
//     notifyAdminConfidence: 65,
//     highRiskDisputeRate: 20,
//     highRiskDeliveryFail: 30,
//     silenceReminderHours: 72,
//     silenceAutoActionDays: 7,
//     visibilityReduceThreshold: 15,

//     // Matching
//     aiMatchingEnabled: true,
//     inviteOnlyMode: true,
//     manualBidding: false,
//     portfolioValidation: true,
//     skillTestRequired: false,

//     // Monitoring
//     projectHealthMonitor: true,
//     behaviorProfiling: true,
//     sentimentAnalysis: true,
//     fraudDetection: true,
//     overloadDetection: true,
//   });

//   const set = (key) => (val) => setSettings((prev) => ({ ...prev, [key]: val }));

//   const [saved, setSaved] = useState(false);
//   const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

//   return (
//     <div className="p-6">
//       <PageHeader
//         title="AI Settings"
//         subtitle="Control automation behavior, thresholds & AI decision boundaries"
//         actions={
//           <ActionBtn
//             label={saved ? "✓ Saved" : "Save Changes"}
//             variant="primary"
//             size="md"
//             style={btnOutline}
//             onClick={handleSave}
//           />
//         }
//       />

//       {/* Info Banner */}
//       <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start gap-3">
//         <span className="text-blue-500 text-lg mt-0.5">◎</span>
//         <div>
//           <p className="text-sm font-semibold text-blue-800">AI Governance Mode</p>
//           <p className="text-xs text-blue-600 mt-0.5">
//             These settings define how the AI governs the platform. High confidence thresholds = more automation. Low thresholds = more admin involvement. Changes take effect immediately.
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

//         {/* Automation Toggles */}
//         <SectionCard title="Automation Controls">
//           <Toggle value={settings.autoApproveMillestones} onChange={set("autoApproveMillestones")}
//             label="Auto-approve milestones on silence"
//             desc="If client silent after timeout, milestone auto-approved and payment released" />
//           <Toggle value={settings.silenceAutoAction} onChange={set("silenceAutoAction")}
//             label="Silence auto-action system"
//             desc="Platform takes action when user ignores reminders" />
//           <Toggle value={settings.autoSuspendHighRisk} onChange={set("autoSuspendHighRisk")}
//             label="Auto-suspend high-risk accounts"
//             desc="AI can suspend accounts without admin approval when risk is extreme" />
//           <Toggle value={settings.autoReduceVisibility} onChange={set("autoReduceVisibility")}
//             label="Auto-reduce visibility on low performance"
//             desc="Freelancers with high dispute rate or missed deadlines are auto-demoted" />
//           <Toggle value={settings.autoBoostTopFreelancers} onChange={set("autoBoostTopFreelancers")}
//             label="Auto-boost Elite++ freelancers"
//             desc="Top performers get automatic visibility boost in matching" />
//         </SectionCard>

//         {/* Confidence Thresholds */}
//         <SectionCard title="AI Confidence Thresholds">
//           <Slider value={settings.autoActionConfidence} onChange={set("autoActionConfidence")}
//             label="Auto-action threshold"
//             desc="AI confidence above this → system acts automatically" />
//           <Slider value={settings.notifyAdminConfidence} onChange={set("notifyAdminConfidence")}
//             label="Notify admin threshold"
//             desc="AI confidence between this and auto-action → admin notified" />
//           <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
//             <p className="text-xs text-gray-500 font-medium mb-2">Decision Logic Preview</p>
//             <div className="space-y-1.5">
//               <div className="flex items-center gap-2 text-xs">
//                 <div className="w-2 h-2 rounded-full bg-green-500 shrink-0"></div>
//                 <span className="text-gray-600">Confidence ≥ <strong>{settings.autoActionConfidence}%</strong> → AI auto-acts</span>
//               </div>
//               <div className="flex items-center gap-2 text-xs">
//                 <div className="w-2 h-2 rounded-full bg-yellow-400 shrink-0"></div>
//                 <span className="text-gray-600"><strong>{settings.notifyAdminConfidence}%</strong> – <strong>{settings.autoActionConfidence - 1}%</strong> → Admin notified</span>
//               </div>
//               <div className="flex items-center gap-2 text-xs">
//                 <div className="w-2 h-2 rounded-full bg-red-400 shrink-0"></div>
//                 <span className="text-gray-600">Below <strong>{settings.notifyAdminConfidence}%</strong> → Manual review only</span>
//               </div>
//             </div>
//           </div>
//         </SectionCard>

//         {/* Risk Thresholds */}
//         <SectionCard title="Risk Detection Thresholds">
//           <Slider value={settings.highRiskDisputeRate} onChange={set("highRiskDisputeRate")}
//             label="High-risk dispute rate"
//             desc="Freelancer dispute % above this triggers risk flag" min={5} max={50} />
//           <Slider value={settings.highRiskDeliveryFail} onChange={set("highRiskDeliveryFail")}
//             label="High-risk delivery fail rate"
//             desc="Missed deadlines % above this triggers risk flag" min={5} max={60} />
//           <Slider value={settings.visibilityReduceThreshold} onChange={set("visibilityReduceThreshold")}
//             label="Visibility reduce threshold"
//             desc="Dispute rate above this auto-reduces visibility" min={5} max={40} />
//         </SectionCard>

//         {/* Silence Rules */}
//         <SectionCard title="Silence & Timeout Rules">
//           <Slider value={settings.silenceReminderHours} onChange={set("silenceReminderHours")}
//             label="First reminder after silence"
//             desc="Hours before first reminder is sent" min={24} max={168} unit="h" />
//           <Slider value={settings.silenceAutoActionDays} onChange={set("silenceAutoActionDays")}
//             label="Auto-action after silence"
//             desc="Days before system takes automatic action" min={3} max={14} unit="d" />
//           <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
//             <p className="text-xs text-yellow-700">
//               <strong>Current flow:</strong> Reminder at {settings.silenceReminderHours}h → Admin alert at {Math.round(settings.silenceReminderHours * 2)}h → Auto-action at {settings.silenceAutoActionDays}d
//             </p>
//           </div>
//         </SectionCard>

//         {/* Matching Settings */}
//         <SectionCard title="AI Matching & Discovery">
//           <Toggle value={settings.aiMatchingEnabled} onChange={set("aiMatchingEnabled")}
//             label="AI-powered job matching"
//             desc="Platform uses AI to curate project invitations for freelancers & agencies" />
//           <Toggle value={settings.inviteOnlyMode} onChange={set("inviteOnlyMode")}
//             label="Invite-only mode (primary)"
//             desc="AI sends invites first; open bidding is secondary" />
//           <Toggle value={settings.manualBidding} onChange={set("manualBidding")}
//             label="Allow manual bidding"
//             desc="Freelancers can bid manually (limited quota per day)" />
//           <Toggle value={settings.portfolioValidation} onChange={set("portfolioValidation")}
//             label="AI portfolio validation"
//             desc="AI scans GitHub links and portfolio for authenticity" />
//           <Toggle value={settings.skillTestRequired} onChange={set("skillTestRequired")}
//             label="Skill test mandatory for onboarding"
//             desc="New freelancers must pass AI skill test before appearing in matches" />
//         </SectionCard>

//         {/* Monitoring */}
//         <SectionCard title="Platform Monitoring">
//           <Toggle value={settings.projectHealthMonitor} onChange={set("projectHealthMonitor")}
//             label="Project health monitoring"
//             desc="AI continuously scores project risk and sends alerts" />
//           <Toggle value={settings.behaviorProfiling} onChange={set("behaviorProfiling")}
//             label="User behavior profiling"
//             desc="AI builds behavior profiles from communication patterns" />
//           <Toggle value={settings.sentimentAnalysis} onChange={set("sentimentAnalysis")}
//             label="Chat sentiment analysis"
//             desc="AI reads chat tone to detect conflict or dissatisfaction early" />
//           <Toggle value={settings.fraudDetection} onChange={set("fraudDetection")}
//             label="Fraud detection system"
//             desc="AI flags suspicious signups, payment patterns, and identity mismatches" />
//           <Toggle value={settings.overloadDetection} onChange={set("overloadDetection")}
//             label="Agency overload detection"
//             desc="AI monitors team capacity vs active projects to prevent overcommitment" />
//         </SectionCard>

//       </div>

//       {/* Save Footer */}
//       <div className="mt-6 flex justify-end gap-3">
//         <ActionBtn label="Reset to Defaults" style={btnNavy} />
//         <ActionBtn label={saved ? "✓ Saved!" : "Save All Changes"} variant="primary" size="md" onClick={handleSave} style={btnOutline} />
//       </div>
//     </div>
//   );
// }










import { useState } from "react";
import { PageHeader, SectionCard, ActionBtn } from "./AdminComponents";

const G = {
  greenLight:  "#A8E063",
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",
  navyLight:   "#4A6FA5",
  navy:        "#1A2B5E",
  navyDeep:    "#0F1A3B",
  navyBg:      "#e8edf7",
  navyBorder:  "#b8c6e0",
  gradGreen: "linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
  gradNavy:  "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
  text:        "#1C1C1C",
  sub:         "#4b5563",
  muted:       "#9ca3af",
  border:      "#e5e7eb",
  bg:          "#f9fafb",
  white:       "#ffffff",
  amber:       "#f59e0b",
  amberBg:     "#fffbeb",
  amberBorder: "#fde68a",
  amberText:   "#92400e",
  red:         "#ef4444",
  redBg:       "#fef2f2",
  redBorder:   "#fecaca",
  redText:     "#dc2626",
  blue:        "#3b82f6",
  blueBg:      "#eff6ff",
  blueBorder:  "#bfdbfe",
  blueText:    "#1d4ed8",
  purple:      "#8b5cf6",
  purpleBg:    "#f5f3ff",
  purpleBorder:"#ddd6fe",
  purpleText:  "#6d28d9",
};
const FONT = "'Poppins', sans-serif";

const RESPONSIVE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
  * { font-family: 'Poppins', sans-serif; }
  input[type=range] { accent-color: #6EC030; }

  /* ── Settings grid ── */
  .ais-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  /* ── Toggle row ── */
  .ais-toggle-thumb {
    position: absolute; top: 2px; width: 16px; height: 16px;
    background: white; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transition: transform 0.2s;
  }

  /* ── Footer row ── */
  .ais-footer {
    margin-top: 24px; display: flex; justify-content: flex-end;
    gap: 12px; flex-wrap: wrap;
  }

  /* ── Page header actions ── */
  .ais-header-actions { display: flex; gap: 8px; flex-wrap: wrap; }

  /* ─────────────────────────────────
     TABLET  ≤900px
  ───────────────────────────────── */
  @media (max-width: 900px) {
    .ais-grid { grid-template-columns: 1fr; }
  }

  /* ─────────────────────────────────
     SMALL PHONE  ≤480px
  ───────────────────────────────── */
  @media (max-width: 480px) {
    .ais-padding { padding: 16px 14px 48px !important; }
    .ais-footer  { justify-content: stretch; }
    .ais-footer > * { flex: 1; justify-content: center; }
  }
`;

const btnNavy = {
  display: "inline-flex", alignItems: "center", gap: 6,
  fontSize: 12, fontWeight: 700, fontFamily: FONT,
  background: G.gradNavy, color: G.white,
  border: "none", borderRadius: 100, padding: "8px 18px", cursor: "pointer",
  boxShadow: "0 3px 12px rgba(15,26,59,0.25)", whiteSpace: "nowrap",
};

const btnOutline = {
  display: "inline-flex", alignItems: "center", gap: 6,
  fontSize: 12, fontWeight: 700, fontFamily: FONT,
  background: G.greenBg, color: G.greenDeep,
  border: `1px solid ${G.greenBorder}`,
  borderRadius: 100, padding: "8px 18px", cursor: "pointer", whiteSpace: "nowrap",
};

function Toggle({ value, onChange, label, desc }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div className="flex-1 mr-4">
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${value ? "bg-[#4A6FA5]" : "bg-gray-200"}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? "translate-x-[22px]" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}

function Slider({ value, onChange, label, desc, min = 0, max = 100, unit = "%" }) {
  return (
    <div className="py-3 border-b border-gray-50 last:border-0">
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1 mr-4">
          <p className="text-sm font-medium text-gray-800">{label}</p>
          {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
        </div>
        <span className="text-sm font-bold text-green-600 shrink-0">{value}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full cursor-pointer"
        style={{ accentColor: G.green }}
      />
      <div className="flex justify-between text-[10px] text-gray-300 mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

export default function AdminAISettings() {
  const [settings, setSettings] = useState({
    autoApproveMillestones: true,
    silenceAutoAction: true,
    autoSuspendHighRisk: false,
    autoReduceVisibility: true,
    autoBoostTopFreelancers: true,
    autoActionConfidence: 90,
    notifyAdminConfidence: 65,
    highRiskDisputeRate: 20,
    highRiskDeliveryFail: 30,
    silenceReminderHours: 72,
    silenceAutoActionDays: 7,
    visibilityReduceThreshold: 15,
    aiMatchingEnabled: true,
    inviteOnlyMode: true,
    manualBidding: false,
    portfolioValidation: true,
    skillTestRequired: false,
    projectHealthMonitor: true,
    behaviorProfiling: true,
    sentimentAnalysis: true,
    fraudDetection: true,
    overloadDetection: true,
  });

  const set = (key) => (val) => setSettings((prev) => ({ ...prev, [key]: val }));
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="ais-padding p-6">
      <style>{RESPONSIVE_CSS}</style>

      <PageHeader
        title="AI Settings"
        subtitle="Control automation behavior, thresholds & AI decision boundaries"
        actions={
          <div className="ais-header-actions">
            <ActionBtn
              label={saved ? "✓ Saved" : "Save Changes"}
              variant="primary"
              size="md"
              style={btnOutline}
              onClick={handleSave}
            />
          </div>
        }
      />

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start gap-3">
        <span className="text-blue-500 text-lg mt-0.5">◎</span>
        <div>
          <p className="text-sm font-semibold text-blue-800">AI Governance Mode</p>
          <p className="text-xs text-blue-600 mt-0.5">
            These settings define how the AI governs the platform. High confidence thresholds = more automation. Low thresholds = more admin involvement. Changes take effect immediately.
          </p>
        </div>
      </div>

      <div className="ais-grid">

        {/* Automation Toggles */}
        <SectionCard title="Automation Controls">
          <Toggle value={settings.autoApproveMillestones} onChange={set("autoApproveMillestones")}
            label="Auto-approve milestones on silence"
            desc="If client silent after timeout, milestone auto-approved and payment released" />
          <Toggle value={settings.silenceAutoAction} onChange={set("silenceAutoAction")}
            label="Silence auto-action system"
            desc="Platform takes action when user ignores reminders" />
          <Toggle value={settings.autoSuspendHighRisk} onChange={set("autoSuspendHighRisk")}
            label="Auto-suspend high-risk accounts"
            desc="AI can suspend accounts without admin approval when risk is extreme" />
          <Toggle value={settings.autoReduceVisibility} onChange={set("autoReduceVisibility")}
            label="Auto-reduce visibility on low performance"
            desc="Freelancers with high dispute rate or missed deadlines are auto-demoted" />
          <Toggle value={settings.autoBoostTopFreelancers} onChange={set("autoBoostTopFreelancers")}
            label="Auto-boost Elite++ freelancers"
            desc="Top performers get automatic visibility boost in matching" />
        </SectionCard>

        {/* Confidence Thresholds */}
        <SectionCard title="AI Confidence Thresholds">
          <Slider value={settings.autoActionConfidence} onChange={set("autoActionConfidence")}
            label="Auto-action threshold"
            desc="AI confidence above this → system acts automatically" />
          <Slider value={settings.notifyAdminConfidence} onChange={set("notifyAdminConfidence")}
            label="Notify admin threshold"
            desc="AI confidence between this and auto-action → admin notified" />
          <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500 font-medium mb-2">Decision Logic Preview</p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-green-500 shrink-0"></div>
                <span className="text-gray-600">Confidence ≥ <strong>{settings.autoActionConfidence}%</strong> → AI auto-acts</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-yellow-400 shrink-0"></div>
                <span className="text-gray-600"><strong>{settings.notifyAdminConfidence}%</strong> – <strong>{settings.autoActionConfidence - 1}%</strong> → Admin notified</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-red-400 shrink-0"></div>
                <span className="text-gray-600">Below <strong>{settings.notifyAdminConfidence}%</strong> → Manual review only</span>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Risk Thresholds */}
        <SectionCard title="Risk Detection Thresholds">
          <Slider value={settings.highRiskDisputeRate} onChange={set("highRiskDisputeRate")}
            label="High-risk dispute rate"
            desc="Freelancer dispute % above this triggers risk flag" min={5} max={50} />
          <Slider value={settings.highRiskDeliveryFail} onChange={set("highRiskDeliveryFail")}
            label="High-risk delivery fail rate"
            desc="Missed deadlines % above this triggers risk flag" min={5} max={60} />
          <Slider value={settings.visibilityReduceThreshold} onChange={set("visibilityReduceThreshold")}
            label="Visibility reduce threshold"
            desc="Dispute rate above this auto-reduces visibility" min={5} max={40} />
        </SectionCard>

        {/* Silence Rules */}
        <SectionCard title="Silence & Timeout Rules">
          <Slider value={settings.silenceReminderHours} onChange={set("silenceReminderHours")}
            label="First reminder after silence"
            desc="Hours before first reminder is sent" min={24} max={168} unit="h" />
          <Slider value={settings.silenceAutoActionDays} onChange={set("silenceAutoActionDays")}
            label="Auto-action after silence"
            desc="Days before system takes automatic action" min={3} max={14} unit="d" />
          <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
            <p className="text-xs text-yellow-700">
              <strong>Current flow:</strong> Reminder at {settings.silenceReminderHours}h → Admin alert at {Math.round(settings.silenceReminderHours * 2)}h → Auto-action at {settings.silenceAutoActionDays}d
            </p>
          </div>
        </SectionCard>

        {/* Matching Settings */}
        <SectionCard title="AI Matching & Discovery">
          <Toggle value={settings.aiMatchingEnabled} onChange={set("aiMatchingEnabled")}
            label="AI-powered job matching"
            desc="Platform uses AI to curate project invitations for freelancers & agencies" />
          <Toggle value={settings.inviteOnlyMode} onChange={set("inviteOnlyMode")}
            label="Invite-only mode (primary)"
            desc="AI sends invites first; open bidding is secondary" />
          <Toggle value={settings.manualBidding} onChange={set("manualBidding")}
            label="Allow manual bidding"
            desc="Freelancers can bid manually (limited quota per day)" />
          <Toggle value={settings.portfolioValidation} onChange={set("portfolioValidation")}
            label="AI portfolio validation"
            desc="AI scans GitHub links and portfolio for authenticity" />
          <Toggle value={settings.skillTestRequired} onChange={set("skillTestRequired")}
            label="Skill test mandatory for onboarding"
            desc="New freelancers must pass AI skill test before appearing in matches" />
        </SectionCard>

        {/* Monitoring */}
        <SectionCard title="Platform Monitoring">
          <Toggle value={settings.projectHealthMonitor} onChange={set("projectHealthMonitor")}
            label="Project health monitoring"
            desc="AI continuously scores project risk and sends alerts" />
          <Toggle value={settings.behaviorProfiling} onChange={set("behaviorProfiling")}
            label="User behavior profiling"
            desc="AI builds behavior profiles from communication patterns" />
          <Toggle value={settings.sentimentAnalysis} onChange={set("sentimentAnalysis")}
            label="Chat sentiment analysis"
            desc="AI reads chat tone to detect conflict or dissatisfaction early" />
          <Toggle value={settings.fraudDetection} onChange={set("fraudDetection")}
            label="Fraud detection system"
            desc="AI flags suspicious signups, payment patterns, and identity mismatches" />
          <Toggle value={settings.overloadDetection} onChange={set("overloadDetection")}
            label="Agency overload detection"
            desc="AI monitors team capacity vs active projects to prevent overcommitment" />
        </SectionCard>

      </div>

      {/* Save Footer */}
      <div className="ais-footer">
        <ActionBtn label="Reset to Defaults" style={btnNavy} />
        <ActionBtn label={saved ? "✓ Saved!" : "Save All Changes"} variant="primary" size="md" onClick={handleSave} style={btnOutline} />
      </div>
    </div>
  );
}