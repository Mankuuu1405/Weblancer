import { useState } from "react";
import { PageHeader, SectionCard, ActionBtn } from "./AdminComponents";

function Toggle({ value, onChange, label, desc }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div className="flex-1 mr-4">
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${value ? "bg-green-500" : "bg-gray-200"}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}

function Slider({ value, onChange, label, desc, min = 0, max = 100, unit = "%" }) {
  return (
    <div className="py-3 border-b border-gray-50 last:border-0">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-sm font-medium text-gray-800">{label}</p>
          {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
        </div>
        <span className="text-sm font-bold text-green-600 ml-4">{value}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-green-500 h-1.5 rounded-full"
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
    // Automation
    autoApproveMillestones: true,
    silenceAutoAction: true,
    autoSuspendHighRisk: false,
    autoReduceVisibility: true,
    autoBoostTopFreelancers: true,

    // Thresholds
    autoActionConfidence: 90,
    notifyAdminConfidence: 65,
    highRiskDisputeRate: 20,
    highRiskDeliveryFail: 30,
    silenceReminderHours: 72,
    silenceAutoActionDays: 7,
    visibilityReduceThreshold: 15,

    // Matching
    aiMatchingEnabled: true,
    inviteOnlyMode: true,
    manualBidding: false,
    portfolioValidation: true,
    skillTestRequired: false,

    // Monitoring
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
    <div className="p-6">
      <PageHeader
        title="AI Settings"
        subtitle="Control automation behavior, thresholds & AI decision boundaries"
        actions={
          <ActionBtn
            label={saved ? "✓ Saved" : "Save Changes"}
            variant="primary"
            size="md"
            onClick={handleSave}
          />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

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
      <div className="mt-6 flex justify-end gap-3">
        <ActionBtn label="Reset to Defaults" />
        <ActionBtn label={saved ? "✓ Saved!" : "Save All Changes"} variant="primary" size="md" onClick={handleSave} />
      </div>
    </div>
  );
}